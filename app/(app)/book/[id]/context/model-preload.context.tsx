import { loadModel } from "@/utils/3d";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Model } from "../animate/types";
import { createModelFromUrls } from "../animate/utils";

interface PreloadedModel {
  model: any; // THREE.js object
  originalModel: Model;
}

interface ModelPreloadContextType {
  preloadedModels: Map<number, PreloadedModel>;
  isModelReady: (index: number) => boolean;
  isModelLoading: (index: number) => boolean;
  getPreloadedModel: (index: number) => PreloadedModel | null;
  models: Model[];
  isInitialLoading: boolean;
  setBookId: (bookId: string | string[] | undefined) => void;
  setModelUrls: (
    modelUrls: { name: string; model: string; textures: string }[]
  ) => void;
  loadModelOnDemand: (index: number) => Promise<void>;
  currentBookId: string | string[] | undefined;
}

const ModelPreloadContext = createContext<ModelPreloadContextType | null>(null);

export const useModelPreload = () => {
  const context = useContext(ModelPreloadContext);
  if (!context) {
    throw new Error("useModelPreload must be used within ModelPreloadProvider");
  }
  return context;
};

interface ModelPreloadProviderProps {
  children: React.ReactNode;
}

export const ModelPreloadProvider: React.FC<ModelPreloadProviderProps> = ({
  children,
}) => {
  const [preloadedModels, setPreloadedModels] = useState<
    Map<number, PreloadedModel>
  >(new Map());
  const [loadingProgress, setLoadingProgress] = useState<Map<number, boolean>>(
    new Map()
  );
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const [models, setModels] = useState<Model[]>([]);
  const [modelUrls, setModelUrls] = useState<
    { name: string; model: string; textures: string }[]
  >([]);
  const [currentBookId, setCurrentBookId] = useState<
    string | string[] | undefined
  >(undefined);
  const loadingRef = useRef<Map<number, Promise<any>>>(new Map());
  const currentBookIdRef = useRef<string | string[] | undefined>(undefined);
  const isCleaningRef = useRef(false);
  const preloadedModelsRef = useRef<Map<number, PreloadedModel>>(new Map());
  const loadingProgressRef = useRef<Map<number, boolean>>(new Map());
  const isInitialLoadingRef = useRef(true);

  // Keep refs in sync with state
  useEffect(() => {
    preloadedModelsRef.current = preloadedModels;
  }, [preloadedModels]);

  useEffect(() => {
    loadingProgressRef.current = loadingProgress;
  }, [loadingProgress]);

  useEffect(() => {
    isInitialLoadingRef.current = isInitialLoading;
  }, [isInitialLoading]);

  /* // Keep currentBookIdRef in sync with state
  useEffect(() => {
    currentBookIdRef.current = currentBookId;
  }, [currentBookId]); */

  // Function to set bookId (called from book detail page)
  const setBookId = useCallback((bookId: string | string[] | undefined) => {
    setCurrentBookId(bookId);
  }, []);

  // Clean up cache when book changes or component unmounts
  const cleanup = useCallback(() => {
    if (isCleaningRef.current) return;
    isCleaningRef.current = true;

    // Clear all models from memory using ref to avoid stale closure
    const modelsToClean = preloadedModelsRef.current;
    modelsToClean.forEach((preloaded) => {
      if (preloaded.model) {
        // Dispose of THREE.js objects to free memory
        preloaded.model.traverse?.((object: any) => {
          if (object.geometry) {
            object.geometry.dispose?.();
          }
          if (object.material) {
            if (Array.isArray(object.material)) {
              object.material.forEach((mat: any) => {
                if (mat.map) mat.map.dispose?.();
                mat.dispose?.();
              });
            } else {
              if (object.material.map) object.material.map.dispose?.();
              object.material.dispose?.();
            }
          }
        });
      }
    });

    setPreloadedModels(new Map());
    setLoadingProgress(new Map());
    loadingRef.current.clear();
    setIsInitialLoading(true);
    setModels([]);
    isCleaningRef.current = false;
  }, [currentBookId]);

  // Initialize model definitions when bookId and modelUrls are available
  // This only creates the model definitions, doesn't load them
  useEffect(() => {
    // If bookId is undefined (not on a book page), don't do anything but keep cache
    if (!currentBookId || modelUrls.length === 0) {
      return;
    }

    // Check if book changed to a different book
    const bookChanged =
      currentBookIdRef.current !== undefined &&
      currentBookIdRef.current !== currentBookId;

    // If book changed, clean up previous cache first
    if (bookChanged) {
      cleanup();
    }

    // Update ref to current bookId
    currentBookIdRef.current = currentBookId;

    // Create model definitions from URLs (no loading yet)
    const modelDefinitions = modelUrls
      .map((u) => createModelFromUrls(u.model, u.textures))
      .filter((m) => m !== null) as Model[];

    if (modelDefinitions.length === 0) {
      setModels([]);
      setIsInitialLoading(false);
      isInitialLoadingRef.current = false;
      return;
    }

    // Set model definitions (but don't load them)
    setModels(modelDefinitions);
    setIsInitialLoading(false);
    isInitialLoadingRef.current = false;
  }, [currentBookIdRef, currentBookId, modelUrls, cleanup]);

  // Function to load a model on-demand
  const loadModelOnDemand = useCallback(
    async (index: number) => {
      // Prevent duplicate loading
      if (loadingRef.current.has(index) || preloadedModels.has(index)) {
        return;
      }

      // Check if book changed during loading
      if (currentBookIdRef.current !== currentBookId) {
        return;
      }

      // Check if we have model definitions
      if (!models || models.length === 0 || !models[index]) {
        return;
      }

      const model = models[index];

      setLoadingProgress((prev) => {
        const newMap = new Map(prev).set(index, true);
        loadingProgressRef.current = newMap;
        return newMap;
      });

      try {
        const loadPromise = loadModel(model);
        loadingRef.current.set(index, loadPromise);

        const loadedModel = await loadPromise;

        // Double-check book hasn't changed
        if (currentBookIdRef.current !== currentBookId) {
          // Dispose of loaded model if book changed
          loadedModel.traverse?.((object: any) => {
            if (object.geometry) object.geometry.dispose?.();
            if (object.material) {
              if (Array.isArray(object.material)) {
                object.material.forEach((mat: any) => {
                  if (mat.map) mat.map.dispose?.();
                  mat.dispose?.();
                });
              } else {
                if (object.material.map) object.material.map.dispose?.();
                object.material.dispose?.();
              }
            }
          });
          return;
        }

        setPreloadedModels((prev) => {
          const newMap = new Map(prev);
          newMap.set(index, { model: loadedModel, originalModel: model });
          // Update ref immediately for synchronous access
          preloadedModelsRef.current = newMap;
          return newMap;
        });
      } catch (error) {
        console.error(`Failed to load model ${index}:`, error);
      } finally {
        setLoadingProgress((prev) => {
          const newMap = new Map(prev);
          newMap.delete(index);
          loadingProgressRef.current = newMap;
          return newMap;
        });
        loadingRef.current.delete(index);
      }
    },
    [currentBookId, models, preloadedModels]
  );

  // Don't cleanup on unmount - keep cache for when user returns to the same book
  // Only cleanup when bookId changes (handled in the main useEffect)

  const isModelReady = useCallback(
    (index: number): boolean => {
      return preloadedModels.has(index);
    },
    [preloadedModels]
  );

  const isModelLoading = useCallback(
    (index: number): boolean => {
      return loadingProgress.has(index) || loadingRef.current.has(index);
    },
    [loadingProgress]
  );

  const getPreloadedModel = useCallback(
    (index: number): PreloadedModel | null => {
      return preloadedModels.get(index) || null;
    },
    [preloadedModels]
  );

  return (
    <ModelPreloadContext.Provider
      value={{
        preloadedModels,
        isModelReady,
        isModelLoading,
        getPreloadedModel,
        models,
        isInitialLoading,
        setBookId,
        setModelUrls,
        loadModelOnDemand,
        currentBookId,
      }}
    >
      {children}
    </ModelPreloadContext.Provider>
  );
};
