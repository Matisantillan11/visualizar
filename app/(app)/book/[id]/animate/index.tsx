import { Button, ThemedText } from "@/components/UI";
import { loadModel } from "@/utils/3d";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AmbientLight,
  HemisphereLight,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  Scene,
} from "three";
import { BottomNavigation } from "./components/bottom-navigation";
import { modelUrls } from "./constants";
import { Model } from "./types";
import { createModelFromUrls } from "./utils";

const onContextCreate = async (gl: any, data: any) => {
  // const {setRenderer, setCamera, setScene} = data;
  const { selected } = data;
  const { drawingBufferWidth: width, drawingBufferHeight: height } = gl;

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

  function update() {
    if (isModelArray) {
      for (let i = 0; i < selected.models.length; i++) {
        if (models[i] && selected.models[i]?.animation) {
          if (selected.models[i].animation?.rotation?.x) {
            models[i].rotation.x += selected.models[i].animation?.rotation?.x;
          }
          if (selected.models[i].animation?.rotation?.y) {
            models[i].rotation.y += selected.models[i].animation?.rotation?.y;
          }
        }
      }
    } else {
      if (models[0] && selected?.animation) {
        if (selected.animation?.rotation?.x) {
          models[0].rotation.x += selected.animation?.rotation?.x;
        }
        if (selected.animation?.rotation?.y) {
          models[0].rotation.y += selected.animation?.rotation?.y;
        }
      }
    }
  }
  // Setup an animation loop
  const render = () => {
    requestAnimationFrame(render);
    update();
    renderer.render(scene, camera);
    gl.endFrameEXP();
  };

  render();
};

const Animate = () => {
  const [models, setModels] = useState<Model[]>([]);
  const [selected, setSelected] = useState<Model | null>(null);
  const [gl, setGL] = useState<ExpoWebGLRenderingContext | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const models = modelUrls
      .map((u) => createModelFromUrls(u.model, u.textures))
      .filter((m) => m !== null);

    if (models && models?.length > 0) {
      setModels(models);
      setSelected(models[0] ?? null);
    }
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
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setSelected(null);
      setTimeout(() => {
        setSelected(models[currentIndex - 1] as any);
      }, 200);
    }

    if (currentIndex === 0) {
      setCurrentIndex(models.length - 1);
      setSelected(null);
      setTimeout(() => {
        setSelected(models[models.length - 1] as any);
      }, 200);
    }
  };

  const handleNext = () => {
    if (currentIndex < models.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setSelected(null);
      setTimeout(() => {
        setSelected(models[currentIndex + 1] as any);
      }, 200);
    }

    if (currentIndex === models.length - 1) {
      setCurrentIndex(0);
      setSelected(null);
      setTimeout(() => {
        setSelected(models[0] as any);
      }, 200);
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {selected ? (
          <CameraView style={{ flex: 1 }} facing={facing}>
            <ThemedText style={{ textAlign: "center", paddingVertical: 40 }}>
              {selected?.name?.split("-")?.join(" ")?.toUpperCase() ||
                "Loading..."}
            </ThemedText>

            <GLView
              style={{ flex: 1 }}
              onContextCreate={(gl) => {
                setGL(gl);
                onContextCreate(gl, { selected });
              }}
            />
          </CameraView>
        ) : (
          <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
          >
            <Text>Loading...</Text>
          </View>
        )}

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
