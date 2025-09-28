import { useAuthContext } from "@/app/(auth)/hooks/useAuthContext";
import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import { View } from "react-native";

export default function Profile() {
  const [user, setUser] = useState<
    | { name: string | null | undefined; avatar: string | null | undefined }
    | undefined
  >(undefined);
  const { getUserData } = useAuthContext();

  useEffect(() => {
    const getUser = async () => {
      const userData = await getUserData();
      setUser(userData);
    };

    getUser();
  }, []);

  if (!user) return null;

  return (
    <View
      style={{
        width: "100%",
        flex: 1,
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        padding: 16,
      }}
    >
      <Image
        source={{
          uri: user?.avatar as string,
        }}
        alt={`${user?.name}-picture`}
        style={{ width: 50, height: 50, borderRadius: 100 }}
      />

      <View style={{ paddingHorizontal: 20 }}>
        <ThemedText
          variant={ThemedTextVariants.default}
          style={{ fontWeight: "bold", fontSize: 14 }}
        >
          {user?.name} - 2A
        </ThemedText>

        <ThemedText
          variant={ThemedTextVariants.default}
          style={{ fontSize: 12 }}
        >
          Instituto Carlos Pellegrini
        </ThemedText>
      </View>
    </View>
  );
}
