import { Container, ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import { fetcher } from "@/lib/fetcher";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AddButton } from "./components/add-button";
import { RequestCard } from "./components/request-card";
import { BookRequest } from "./types";

export default function Requests() {
  const [requests, setRequests] = useState<BookRequest[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const router = useRouter();

  const isIos = Platform.OS === "ios";

  useEffect(() => {
    try {
      setIsLoading(true);
      fetcher<BookRequest[]>({
        url: "/books/requests",
      })
        .then((response) => {
          setRequests(response);
          return response;
        })
        .catch((error) => {
          console.error(error);
          return [];
        });
    } catch (error) {
      console.log({ error });
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleAddRequest = () => {
    router.navigate("/book/request-book");
  };

  console.log({ requests });

  return (
    <Container gradient withNavbar>
      <View
        style={{
          marginTop: isIos ? -32 : 0,
          marginBottom: 21,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <ThemedText style={styles.title} variant={ThemedTextVariants.default}>
          Tus solicitudes
        </ThemedText>

        <AddButton onPress={handleAddRequest} />
      </View>

      {isLoading ? (
        <ActivityIndicator color="white" size="large" />
      ) : (
        <ScrollView
          contentContainerStyle={{ gap: 16, paddingBottom: isIos ? 64 : 128 }}
          showsVerticalScrollIndicator={false}
        >
          {requests?.length
            ? requests.map((request) => (
                <RequestCard key={request.id} request={request} />
              ))
            : null}
        </ScrollView>
      )}
    </Container>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: theme.primary.brand50,
  },
});
