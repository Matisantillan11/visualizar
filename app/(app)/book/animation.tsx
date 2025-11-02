import { Button, ThemedText } from "@/components/UI";
import { loadModel } from "@/utils/3d";
import { CameraType, CameraView, useCameraPermissions } from "expo-camera";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { Renderer } from "expo-three";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  AmbientLight,
  HemisphereLight,
  OrthographicCamera,
  PerspectiveCamera,
  PointLight,
  Scene,
} from "three";

const modelOBJ = {
  dato: {
    type: "obj",
    name: "dato",
    isometric: false,
    model: require("../models/dato-curioso/dato-curioso.obj"),
    textures: [
      {
        image: require("../models/dato-curioso/dato-curioso.png"),
      },
    ],
    scale: {
      x: 0.7,
      y: 0.7,
      z: 0.7,
    },
    position: {
      x: 0,
      y: 3,
      z: 0,
    },
  },
  fernando: {
    type: "obj",
    name: "fernando",
    isometric: false,
    model: require("../models/fernando/fernando.obj"),
    textures: [
      {
        image: require("../models/fernando/fernando.png"),
      },
    ],
    scale: {
      x: 5,
      y: 5,
      z: 5,
    },
    position: {
      x: 0,
      y: -3,
      z: 0,
    },
    animation: {
      rotation: {
        y: 0.01,
      },
    },
  },
  "fernando-adulto": {
    type: "obj",
    name: "fernando-adulto",
    isometric: false,
    model: require("../models/fernando-adulto/fernando-adulto.obj"),
    textures: [
      {
        image: require("../models/fernando-adulto/fernando-adulto.png"),
      },
    ],
    scale: {
      x: 5,
      y: 5,
      z: 5,
    },
    position: {
      x: 0,
      y: 0,
      z: 0,
    },
    animation: {
      rotation: {
        y: 0.01,
      },
    },
  },
  mercedes: {
    type: "obj",
    name: "mercedes",
    isometric: false,
    model: require("../models/mercedes/mercedes.obj"),
    textures: [
      {
        image: require("../models/mercedes/mercedes.png"),
      },
    ],
    scale: {
      x: 5,
      y: 5,
      z: 5,
    },
    position: {
      x: 0,
      y: -3,
      z: 0,
    },
    animation: {
      rotation: {
        y: 0.01,
      },
    },
  },
};

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
  const hemisphereLight = new HemisphereLight(0xffffbb, 0x080820, 1);
  scene.add(hemisphereLight);

  // AmbientLight - add more brightness?
  const ambientLight = new AmbientLight(0x404040); // soft white light
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

interface Model {
  type: string;
  name: string;
  isometric?: boolean;
  model: any;
  textures: {
    image: any;
  }[];
  scale?: {
    x: number;
    y: number;
    z: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  animation?: {
    rotation: {
      x?: number;
      y?: number;
    };
  };
}
const RNThree = (props: any) => {
  const models = [
    modelOBJ.dato,
    modelOBJ.fernando,
    modelOBJ.mercedes,
    modelOBJ["fernando-adulto"],
  ];
  const [selected, setSelected] = useState<Model | null>(models[0]);
  const [gl, setGL] = useState<ExpoWebGLRenderingContext | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>("back");
  const [isLoading, setIsLoading] = useState(true);

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

  return (
    <View style={styles.container}>
      <View style={{ flex: 1 }}>
        {selected ? (
          <CameraView
            style={{ flex: 1 }}
            facing={facing}
            onCameraReady={() => setIsLoading(false)}
          >
            <ThemedText style={{ textAlign: "center", paddingVertical: 40 }}>
              {selected.name.split("-").join(" ").toUpperCase()}
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
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{
            flexDirection: "row",
            position: "absolute",
            bottom: 50,
            alignContent: "center",
            left: "35%",
            right: 0,
          }}
        >
          {models.map((x) => (
            <View
              key={`${x.name}-${x.type}`}
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                style={{
                  borderRadius: 100,
                  borderWidth: 1,
                  borderColor: "#3389c5",
                  backgroundColor: selected === x ? "#3389c5" : "#3389c5",
                  padding: selected === x ? 8 : 6,
                  marginRight: 10,
                }}
                onPress={() => {
                  setSelected(null);
                  setTimeout(() => {
                    setSelected(x);
                  }, 200);
                }}
              />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
};

export default RNThree;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
