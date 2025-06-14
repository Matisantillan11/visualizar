import { Button } from "@/components/UI";
import { Asset } from "expo-asset";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useRef, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureHandlerRootView,
} from "react-native-gesture-handler";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import { useSharedValue } from "react-native-reanimated";

export default function BookCameraView() {
  const { height } = useWindowDimensions();
  const requestRef = useRef<number>(0);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

  const rotationX = useSharedValue(0); // For X-axis rotation
  const rotationY = useSharedValue(0); // For Y-axis rotation
  const scale = useSharedValue(1); // For scaling the object

  const modelRef = useRef<THREE.Object3D | null>(null);

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission}>Grant access</Button>
      </View>
    );
  }

  const onContextCreate = async (gl: ExpoWebGLRenderingContext) => {
    const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

    // Set up THREE renderer
    const renderer = new Renderer({ gl });
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // Create scene and camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 2;

    // Add light
    const light = new THREE.DirectionalLight(0xffffff, 1);
    light.position.set(0, 1, 1).normalize();
    scene.add(light);

    // Load the OBJ model
    const loader = new GLTFLoader();

    const asset = await Asset.fromModule(
      require("../../../assets/example.glb")
    ).downloadAsync();

    // Leer el contenido del asset como ArrayBuffer
    const response = await fetch(asset.uri);
    const arrayBuffer = await response.arrayBuffer();

    loader.parse(
      arrayBuffer, // El ArrayBuffer que contiene los datos del GLB
      "", // Base URL (vacío porque las texturas están incrustadas o se manejan internamente)
      (gltf: any) => {
        modelRef.current = gltf.scene; // Store the loaded model in the ref
        if (modelRef.current) {
          // Initial scale and position
          modelRef.current.scale.set(0.65, 1, 0.1); // Adjust initial scale as needed
          modelRef.current.position.y = 0; // Adjust initial position as needed
          scene.add(modelRef.current);
          console.log("GLB model loaded successfully from ArrayBuffer!");
        }
      },
      (error: any) => {
        console.error("An error happened while parsing the GLB model:", error);
      }
    );

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      if (modelRef.current) {
        // Apply rotation from shared values
        modelRef.current.rotation.y = rotationY.value;
        modelRef.current.rotation.x = rotationX.value;

        // Apply scale from shared value
        modelRef.current.scale.setScalar(0.55 + scale.value * 0.1); // Multiply by 0.1 because initial scale was set to (0.65, 1, 0.1)
        // You might need to adjust this multiplier based on your desired base scale
      }

      renderer.render(scene, camera);
      gl.endFrameEXP(); // Required by expo-gl
    };

    animate();
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      // Update rotation based on pan gesture translation
      // Adjust sensitivity as needed
      rotationY.value += event.translationX * 0.00075; // Horizontal pan for Y-axis rotation
    })
    .onEnd(() => {
      // Optional: Add a smooth animation to settle if desired
      // For now, it updates directly on update
    });

  // Define the Pinch Gesture
  const pinchGesture = Gesture.Pinch()
    .onUpdate((event) => {
      // Update scale based on pinch gesture scale factor
      // Ensure scale doesn't go too small or too big
      scale.value = Math.max(1, event.scale); // Clamp scale between 0.1 and 3
    })
    .onEnd(() => {
      // Optional: Reset scale or apply a spring animation
      // scale.value = withSpring(scale.value);
    });

  // Combine gestures
  const composedGesture = Gesture.Simultaneous(panGesture, pinchGesture);

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <GestureHandlerRootView>
          <GestureDetector gesture={composedGesture}>
            <GLView
              style={{
                height,
              }}
              onContextCreate={onContextCreate}
            />
          </GestureDetector>
        </GestureHandlerRootView>
      </CameraView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
});
