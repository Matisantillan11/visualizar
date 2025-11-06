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

  // Keep currentBookIdRef in sync with state
  useEffect(() => {
    currentBookIdRef.current = currentBookId;
  }, [currentBookId]);

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
  }, []);

  // Initialize models when bookId is available
  useEffect(() => {
    // If bookId is undefined (not on a book page), don't do anything but keep cache
    if (!currentBookId || modelUrls.length === 0) {
      return;
    }

    // Check if book changed to a different book
    const bookChanged =
      currentBookIdRef.current !== undefined &&
      currentBookIdRef.current !== currentBookId;

    // If we already have models loaded for this book, don't reload them
    const isSameBook = currentBookIdRef.current === currentBookId;
    if (isSameBook && models.length > 0 && preloadedModels.size > 0) {
      // Already loaded, just ensure isInitialLoading is false if models are ready
      if (isInitialLoadingRef.current) {
        const hasAtLeastOneReady = models.some((_, idx) =>
          preloadedModelsRef.current.has(idx)
        );
        if (hasAtLeastOneReady) {
          setIsInitialLoading(false);
          isInitialLoadingRef.current = false;
        }
      }
      return;
    }

    // If book changed, clean up previous cache first
    if (bookChanged) {
      cleanup();
    }

    // Update ref to current bookId (always update, even if book changed)
    currentBookIdRef.current = currentBookId;

    // Reset loading state to ensure fresh start for new book
    setIsInitialLoading(true);
    isInitialLoadingRef.current = true;

    // Defer model preloading to next tick to avoid blocking rendering
    // This ensures the book detail page renders immediately
    const startPreloading = () => {
      // Double-check bookId hasn't changed during the async delay
      if (
        currentBookIdRef.current !== currentBookId ||
        modelUrls.length === 0
      ) {
        return;
      }

      // Create model definitions from URLs
      const modelDefinitions = modelUrls
        .map((u) => createModelFromUrls(u.model, u.textures))
        .filter((m) => m !== null) as Model[];

      if (modelDefinitions.length === 0) {
        setModels([]);
        setIsInitialLoading(false);
        isInitialLoadingRef.current = false;
        return;
      }

      // Double-check again before setting state
      if (currentBookIdRef.current !== currentBookId) {
        return;
      }

      setModels(modelDefinitions);
      setIsInitialLoading(true);
      isInitialLoadingRef.current = true;

      // Priority: Define which models to load first
      const priorityModels = modelDefinitions.slice(
        0,
        Math.min(3, modelDefinitions.length)
      );

      const preloadModel = async (index: number, model: Model) => {
        // Prevent duplicate loading
        if (loadingRef.current.has(index) || preloadedModels.has(index)) {
          return;
        }

        // Check if book changed during loading
        if (currentBookIdRef.current !== currentBookId) {
          return;
        }

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

            // If this is a priority model, check if initial loading is complete
            if (index < priorityModels.length) {
              // Check immediately if all priority models are loaded
              const allPriorityLoaded = priorityModels.every((_, idx) => {
                return newMap.has(idx);
              });
              const noneStillLoading = priorityModels.every((_, idx) => {
                return (
                  !loadingProgressRef.current.has(idx) &&
                  !loadingRef.current.has(idx)
                );
              });

              if (
                allPriorityLoaded &&
                noneStillLoading &&
                isInitialLoadingRef.current
              ) {
                setIsInitialLoading(false);
                isInitialLoadingRef.current = false;
              }
            }

            return newMap;
          });
        } catch (error) {
          console.error(`Failed to preload model ${index}:`, error);
        } finally {
          setLoadingProgress((prev) => {
            const newMap = new Map(prev);
            newMap.delete(index);
            loadingProgressRef.current = newMap;
            return newMap;
          });
          loadingRef.current.delete(index);
        }
      };

      // Priority: Load first 3 models immediately
      priorityModels.forEach((model, index) => {
        preloadModel(index, model);
      });

      // After priority models start, load the rest in background
      if (modelDefinitions.length > 3) {
        const backgroundModels = modelDefinitions.slice(3);
        backgroundModels.forEach((model, offset) => {
          const index = 3 + offset;
          // Small delay to prioritize first 3
          setTimeout(() => {
            if (currentBookIdRef.current === currentBookId) {
              preloadModel(index, model);
            }
          }, 100 * offset); // Stagger background loading
        });
      }

      // Check if initial loading is complete
      let checkInterval: ReturnType<typeof setInterval> | null = null;
      const checkInitialLoading = () => {
        // Use refs to get current state values
        const currentModels = preloadedModelsRef.current;
        const currentLoadingProgress = loadingProgressRef.current;

        if (currentBookIdRef.current !== currentBookId) {
          if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
          return;
        }

        // Check if all priority models are actually loaded (not just started)
        const allPriorityLoaded = priorityModels.every((_, index) => {
          return currentModels.has(index);
        });

        // Check if none of the priority models are still in loading progress
        const noneStillLoading = priorityModels.every((_, index) => {
          return (
            !currentLoadingProgress.has(index) && !loadingRef.current.has(index)
          );
        });

        if (allPriorityLoaded && noneStillLoading) {
          setIsInitialLoading(false);
          isInitialLoadingRef.current = false;
          if (checkInterval) {
            clearInterval(checkInterval);
            checkInterval = null;
          }
        }
      };

      // Check periodically if initial models are ready
      checkInterval = setInterval(checkInitialLoading, 100);

      // Safety timeout: if initial loading takes more than 30 seconds, mark as complete
      // This prevents infinite loading if models fail to load
      const safetyTimeoutId = setTimeout(() => {
        if (isInitialLoadingRef.current) {
          // Check if at least one model is ready
          const hasAtLeastOne = priorityModels.some((_, idx) =>
            preloadedModelsRef.current.has(idx)
          );
          if (hasAtLeastOne) {
            setIsInitialLoading(false);
            isInitialLoadingRef.current = false;
          }
        }
      }, 30000);

      return () => {
        if (checkInterval) clearInterval(checkInterval);
        clearTimeout(safetyTimeoutId);
      };
    };

    // Start preloading in the next tick to avoid blocking
    const preloadTimeoutId = setTimeout(startPreloading, 0);

    return () => {
      clearTimeout(preloadTimeoutId);
    };
  }, [currentBookId, modelUrls, cleanup]);

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
        currentBookId,
      }}
    >
      {children}
    </ModelPreloadContext.Provider>
  );
};
