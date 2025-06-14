import { Button } from "@/components/UI";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import { useRef, useState } from "react";
import { StyleSheet, Text, useWindowDimensions, View } from "react-native";
import * as THREE from "three";

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

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
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

    // Add a cube
    const geometry = new THREE.BoxGeometry(0.65, 1, 0.1);
    const materials = [
      new THREE.MeshBasicMaterial({ color: "#8B0000" }), // right
      new THREE.MeshBasicMaterial({ color: "#FFFFFF" }), // left
      new THREE.MeshBasicMaterial({ color: "#FFFFFF" }), // top
      new THREE.MeshBasicMaterial({ color: "#FFFFFF" }), // bottom
      new THREE.MeshBasicMaterial({ color: "#8B0000" }), // front
      new THREE.MeshBasicMaterial({ color: "#8B0000" }), // back (lomo)
    ];
    const book = new THREE.Mesh(geometry, materials);
    book.position.y = 0;
    scene.add(book);

    renderer.render(scene, camera);
    // Animation loop
    const animate = () => {
      requestRef.current = requestAnimationFrame(animate);

      book.rotation.y += 0.01;

      renderer.render(scene, camera);
      gl.endFrameEXP(); // Required by expo-gl
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
