import { VerticalLinearGradient } from "@/components/linear-gradient/linear-gradient.component";
import {
  Button,
  ButtonVariants,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { BlurView } from "@/components/UI/blur-view/blur-view.component";
import { theme } from "@/constants";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { useRouter } from "expo-router";
import { Renderer, THREE } from "expo-three";
import { useRef } from "react";
import { ScrollView, useWindowDimensions, View } from "react-native";

export default function Book() {
  const router = useRouter();
  const requestRef = useRef<number>(0);
  const { height, width } = useWindowDimensions();

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
    book.position.y = 0.65;
    scene.add(book);

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
    <VerticalLinearGradient>
      <View style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View
            style={{
              alignItems: "center",
              marginVertical: 35,
            }}
          >
            <ThemedText>The tiny dragon</ThemedText>
            <ThemedText
              variant={ThemedTextVariants.default}
              style={{ fontSize: 16 }}
            >
              Rupert Carter
            </ThemedText>
          </View>

          <BlurView
            color={theme.primary.brand300}
            intensity={90}
            size={450}
            top={75}
            left={-25}
          />
          <GLView
            style={{
              height: height * 0.65,
            }}
            onContextCreate={onContextCreate}
          />

          <ThemedText
            variant={ThemedTextVariants.default}
            style={{
              marginTop: -225,
              paddingHorizontal: 32,
            }}
          >
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a gal... Lorem
            Ipsum is simply dummy text of the printing and typesetting industry.
            Lorem Ipsum has been the industry's standard dummy text ever since
            the 1500s, when an unknown printer took a gal...
          </ThemedText>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              padding: 32,
            }}
          >
            <Button
              style={{ width: width / 2.5 }}
              onPress={() => router.push("/book/camera")}
            >
              Ver animaciones
            </Button>
            <Button
              variant={ButtonVariants.outlined}
              style={{ width: width / 2.5 }}
            >
              Calificar libro
            </Button>
          </View>
        </ScrollView>
      </View>
    </VerticalLinearGradient>
  );
}
