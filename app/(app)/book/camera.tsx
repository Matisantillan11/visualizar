import { Button } from "@/components/UI";
import { Asset } from "expo-asset";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useRef, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function BookCameraView() {
  const { height } = useWindowDimensions();
  const requestRef = useRef<number>(0);
  const [facing, setFacing] = useState<CameraType>("back");
  const [permission, requestPermission] = useCameraPermissions();

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
    let loadedObject: THREE.Object3D | null = null;
    const loader = new GLTFLoader();

    const asset = await Asset.fromModule(
      require("../../../assets/example.glb")
    ).downloadAsync();

    loader.load(
      asset.uri,
      (gltf: any) => {
        loadedObject = gltf.scene as THREE.Object3D<THREE.Object3DEventMap>; // GLTFLoader returns a GLTF object, gltf.scene contains the 3D model
        loadedObject.scale.set(0.65, 1, 0.1); // Adjust scale as needed
        loadedObject.position.y = 0; // Position the model
        scene.add(loadedObject); // Add the model to the scene
      },
      (xhr: any) => {
        // Optional: Progress callback
        console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
      },
      (error: any) => {
        // Error callback
        console.error("An error happened while loading the GLB model:", error);
      }
    );

    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      if (loadedObject) {
        loadedObject.scale.setScalar(1 + 0.1 * Math.sin(Date.now() * 0.001));
        loadedObject.rotateY(0.01);
        renderer.render(scene, camera);
        gl.endFrameEXP();
      }
    };

    animate();
  };

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing}>
        <GLView
          style={{
            height: height * 0.65,
          }}
          onContextCreate={onContextCreate}
        />
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
