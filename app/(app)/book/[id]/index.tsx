import { VerticalLinearGradient } from "@/components/linear-gradient/linear-gradient.component";
import {
  Banner,
  BlurView,
  Button,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { theme } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Renderer, THREE } from "expo-three";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { Book } from "../types/book";
import { useModelPreload } from "./context/model-preload.context";
import { parseAnimations } from "./utils";

export default function BookDetail() {
  const { id } = useLocalSearchParams();

  const router = useRouter();
  const requestRef = useRef<number>(0);

  const { setBookId, setModelUrls } = useModelPreload();

  const [book, setBook] = useState<Book | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isIos = Platform.OS === "ios";
  const bookUrl = `/books/${id}`;

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        setBookId(id);
        const response = await fetcher<Book>({
          url: bookUrl,
        });

        if (response) {
          setBook(response);
          const animations = parseAnimations(response.animations);
          setModelUrls(animations);
          setIsLoading(false);
        }
      }
    };

    fetchBook();
  }, [id]);

  const { height } = useWindowDimensions();

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
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            {!book?.is3dEnabled ? <Banner /> : null}
            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginVertical: 35,
              }}
            >
              <ThemedText style={{ fontSize: isIos ? 24 : 20 }}>
                {book?.name}
              </ThemedText>
              <ThemedText
                variant={ThemedTextVariants.default}
                style={{ fontSize: 16 }}
              >
                {book?.bookAuthor[0].author.name}
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
              {book?.description?.slice(0, 300)}...
            </ThemedText>
            {book?.is3dEnabled && (
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  padding: 32,
                }}
              >
                <Button
                  style={{ width: "100%" }}
                  onPress={() => router.push(`/book/${id}/animate`)}
                >
                  Ver animaciones
                </Button>
              </View>
            )}
          </ScrollView>
        )}
      </View>
    </VerticalLinearGradient>
  );
}
