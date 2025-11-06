import { Button, ThemedText } from "@/components/UI";
import { loadModel } from "@/utils/3d";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import React, { useEffect, useRef, useState } from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import { useSharedValue } from "react-native-reanimated";
import {
  AmbientLight,
  HemisphereLight,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  Scene,
} from "three";
import { useModelPreload } from "../context/model-preload.context";
import { BottomNavigation } from "./components/bottom-navigation";
import { Model } from "./types";

const onContextCreate = async (
  gl: any,
  data: any,
  cleanupRef: React.MutableRefObject<(() => void) | null>
) => {
  const { selected, preloadedModel, rotationY, scale } = data;
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

  let isAnimating = true;
  let animationFrameId: number | null = null;

  // Create a WebGLRenderer without a DOM element
  const renderer = new Renderer({ gl });
  renderer.setSize(width, height);

  const isModelArray = selected?.models && Array.isArray(selected.models);

  let camera;
  if (selected.isometric) {
    // use this if wan isometric view
    var aspect = width / height;
    var d = 10;
    camera = new OrthographicCamera(-d * aspect, d * aspect, d, -d, -10, 1000);
  } else {
    // use this if wan normal view
    camera = new PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.set(0, 0, 10);
  }

  const scene = new Scene();

  const pointLight = new PointLight(0xffffff, 2, 1000, 1);
  pointLight.position.set(0, 30, 100);
  // scene.add(pointLight);

  // HemisphereLight - color feels nicer
  const hemisphereLight = new HemisphereLight(0x000000, 0xffffff, 1);
  scene.add(hemisphereLight);

  // AmbientLight - add more brightness?
  const ambientLight = new AmbientLight(0xffffff); // soft white light
  scene.add(ambientLight);

  let models: any[] = [];

  // Use preloaded model if available, otherwise load on demand
  if (preloadedModel) {
    // Clone the preloaded model to avoid issues with multiple scenes
    const model = preloadedModel.model.clone();
    scene.add(model);
    models.push(model);
  } else {
    // Fallback: load on demand (shouldn't happen if preloading works, but safe fallback)
    if (isModelArray) {
      for (let i = 0; i < selected.models.length; i++) {
        const modelItem = selected.models[i];
        const model = await loadModel(modelItem);
        scene.add(model);
        models.push(model);
      }
    } else {
      const model = await loadModel(selected);
      scene.add(model);
      models.push(model);
    }
  }

  function update() {
    if (!isAnimating) return;

    if (isModelArray) {
      for (let i = 0; i < selected.models.length; i++) {
        if (models[i]) {
          // Apply horizontal rotation (Y-axis)
          models[i].rotation.y = rotationY.value;

          // Apply scale
          models[i].scale.set(scale.value, scale.value, scale.value);

          // Apply original animation if it exists
          if (selected.models[i]?.animation) {
            if (selected.models[i].animation?.rotation?.x) {
              models[i].rotation.x += selected.models[i].animation.rotation.x;
            }
          }
        }
      }
    } else {
      if (models[0]) {
        // Apply horizontal rotation (Y-axis)
        models[0].rotation.y = rotationY.value;

        // Apply scale
        models[0].scale.set(scale.value, scale.value, scale.value);

        // Apply original animation if it exists
        if (selected?.animation) {
          if (selected.animation?.rotation?.x) {
            models[0].rotation.x += selected.animation.rotation.x;
          }
        }
      }
    }
  }

  // Setup an animation loop
  const render = () => {
    if (!isAnimating) return;

    animationFrameId = requestAnimationFrame(render);

    if (!isAnimating || !scene || !camera || !renderer) return;

    try {
      update();
      renderer.render(scene, camera);
      gl.endFrameEXP();
    } catch (error) {
      // Stop animation if there's an error (e.g., context was destroyed)
      isAnimating = false;
      if (animationFrameId !== null) {
        cancelAnimationFrame(animationFrameId);
      }
    }
  };

  render();

  // Store cleanup function
  cleanupRef.current = () => {
    isAnimating = false;
    if (animationFrameId !== null) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }
    // Clean up THREE.js resources
    if (scene) {
      scene.traverse((object: any) => {
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
      scene.clear();
    }
    cleanupRef.current = null;
  };
};

const Animate = () => {
  const { models, isModelReady, getPreloadedModel, isInitialLoading } =
    useModelPreload();
  const [selected, setSelected] = useState<Model | null>(null);
  const [gl, setGL] = useState<ExpoWebGLRenderingContext | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [currentIndex, setCurrentIndex] = useState(0);
  const cleanupRef = useRef<(() => void) | null>(null);

  const rotationY = useSharedValue(0); // For Y-axis rotation (horizontal)
  const scale = useSharedValue(1); // For scaling the object (will be initialized from model)
  const lastPanX = useRef(0);
  const lastScale = useRef(1);
  const initialScaleRef = useRef(1); // Track the initial scale for the current model

  // Initialize selected model when models are available
  useEffect(() => {
    if (models && models.length > 0 && !selected) {
      // Wait for first model to be ready if initial loading is still happening
      if (isInitialLoading) {
        const checkReady = setInterval(() => {
          if (isModelReady(0)) {
            setSelected(models[0]);
            clearInterval(checkReady);
          }
        }, 100);
        return () => clearInterval(checkReady);
      } else {
        setSelected(models[0]);
      }
    }
  }, [models, isInitialLoading, isModelReady, selected]);

  // Reset rotation and scale when model changes
  useEffect(() => {
    rotationY.value = 0;
    lastPanX.current = 0;

    // Get the initial scale from the model's configuration
    const currentModel = models[currentIndex];
    const initialScale = currentModel?.scale?.x || 1;
    initialScaleRef.current = initialScale;
    if (initialScale !== scale.value) {
      scale.value = initialScale;
      lastScale.current = initialScale;
    }
  }, [currentIndex, models]);

  // Initialize scale when model is first selected
  useEffect(() => {
    if (selected) {
      const initialScale = selected.scale?.x || 1;
      initialScaleRef.current = initialScale;
      scale.value = initialScale;
      lastScale.current = initialScale;
    }
  }, [selected]);

  // Cleanup animation when component unmounts or selected changes
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, [selected]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        cleanupRef.current();
      }
    };
  }, []);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text>We need your permission to show the camera</Text>
        <Button onPress={requestPermission}>Grant access</Button>
      </View>
    );
  }

  const handlePrevious = () => {
    const newIndex = currentIndex > 0 ? currentIndex - 1 : models.length - 1;
    setCurrentIndex(newIndex);
    setSelected(null);

    // Check if model is ready before showing
    if (isModelReady(newIndex)) {
      setTimeout(() => {
        setSelected(models[newIndex]);
      }, 200);
    } else {
      // Wait for model to be ready
      const checkReady = setInterval(() => {
        if (isModelReady(newIndex)) {
          setSelected(models[newIndex]);
          clearInterval(checkReady);
        }
      }, 100);

      // Cleanup interval after 30 seconds (shouldn't take that long, but safety)
      setTimeout(() => clearInterval(checkReady), 30000);
    }
  };

  const handleNext = () => {
    const newIndex = currentIndex < models.length - 1 ? currentIndex + 1 : 0;
    setCurrentIndex(newIndex);
    setSelected(null);

    // Check if model is ready before showing
    if (isModelReady(newIndex)) {
      setTimeout(() => {
        setSelected(models[newIndex]);
      }, 200);
    } else {
      // Wait for model to be ready
      const checkReady = setInterval(() => {
        if (isModelReady(newIndex)) {
          setSelected(models[newIndex]);
          clearInterval(checkReady);
        }
      }, 100);

      // Cleanup interval after 30 seconds (shouldn't take that long, but safety)
      setTimeout(() => clearInterval(checkReady), 30000);
    }
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      // Store the starting position
      lastPanX.current = 0;
    })
    .onUpdate((event) => {
      // Calculate delta from last position
      const deltaX = event.translationX - lastPanX.current;
      // Update rotation based on horizontal pan (sensitivity: 0.01 radians per pixel)
      rotationY.value += deltaX * 0.01;
      lastPanX.current = event.translationX;
    })
    .onEnd(() => {
      lastPanX.current = 0;
    });

  // Define the Pinch Gesture
  const pinchGesture = Gesture.Pinch()
    .onStart(() => {
      // Store the starting scale
      lastScale.current = scale.value;
    })
    .onUpdate((event) => {
      // Calculate new scale based on pinch factor relative to starting scale
      const newScale = lastScale.current * event.scale;
      // Minimum is half of the initial scale, no maximum limit
      const minScale = initialScaleRef.current * 0.5;
      scale.value = Math.max(minScale, newScale);
    })
    .onEnd(() => {
      lastScale.current = scale.value;
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  if (models.length === 0) {
    return (
      <View style={styles.container}>
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>Loading 3D models...</Text>
          <ActivityIndicator size="large" style={{ marginTop: 20 }} />
        </View>
      </View>
    );
  }

  const showLoadingOverlay =
    (isInitialLoading && currentIndex === 0) ||
    !selected ||
    !isModelReady(currentIndex);

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        <CameraView style={{ flex: 1 }} facing={facing}>
          <ThemedText
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              textAlign: "center",
              paddingVertical: 40,
            }}
          >
            {models[currentIndex]?.name?.split("-")?.join(" ")?.toUpperCase() ??
              "Loading..."}
          </ThemedText>

          {selected && isModelReady(currentIndex) ? (
            <GestureHandlerRootView style={{ flex: 1 }}>
              <GestureDetector gesture={composedGesture}>
                <GLView
                  style={{ flex: 1 }}
                  onContextCreate={(gl) => {
                    // Cleanup previous animation if it exists
                    if (cleanupRef.current) {
                      cleanupRef.current();
                    }
                    setGL(gl);
                    const preloaded = getPreloadedModel(currentIndex);
                    onContextCreate(
                      gl,
                      {
                        selected,
                        preloadedModel: preloaded,
                        rotationY,
                        scale,
                      },
                      cleanupRef
                    );
                  }}
                />
              </GestureDetector>
            </GestureHandlerRootView>
          ) : null}

          {showLoadingOverlay && (
            <View
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "rgba(0, 0, 0, 0.3)",
              }}
            >
              <Text style={{ color: "white", marginBottom: 10 }}>
                Loading model...
              </Text>
              <ActivityIndicator size="large" color="white" />
            </View>
          )}
        </CameraView>

        <BottomNavigation
          handlePrevious={handlePrevious}
          handleNext={handleNext}
          currentIndex={currentIndex}
          optionsLength={models.length}
        />
      </View>
    </View>
  );
};

export default Animate;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
