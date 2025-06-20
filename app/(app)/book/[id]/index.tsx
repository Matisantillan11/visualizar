import { VerticalLinearGradient } from "@/components/linear-gradient/linear-gradient.component";
import {
  Button,
  ButtonVariants,
  ThemedText,
  ThemedTextVariants,
} from "@/components/UI";
import { BlurView } from "@/components/UI/blur-view/blur-view.component";
import { theme } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { ExpoWebGLRenderingContext, GLView } from "expo-gl";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Renderer, THREE } from "expo-three";
import { useEffect, useRef, useState } from "react";
import {
  ActivityIndicator,
  ScrollView,
  useWindowDimensions,
  View,
} from "react-native";
import { Book, BookResponse } from "../types/book";

export default function BookDetail() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const requestRef = useRef<number>(0);

  const [book, setBook] = useState<Book | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const bookUrl = `/api/books/${id}?populate[author_id][fields][0]=name`;

  useEffect(() => {
    const fetchBook = async () => {
      if (id) {
        const response = await fetcher<BookResponse>({
          url: bookUrl,
        });

        if (response && response.data) {
          setBook(response.data);
          setIsLoading(false);
        }
      }
    };

    fetchBook();
  }, [id]);

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
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View
              style={{
                alignItems: "center",
                marginVertical: 35,
              }}
            >
              <ThemedText>{book?.name}</ThemedText>
              <ThemedText
                variant={ThemedTextVariants.default}
                style={{ fontSize: 16 }}
              >
                {book?.author_id?.name}
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
        )}
      </View>
    </VerticalLinearGradient>
  );
}
