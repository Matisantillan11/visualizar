import { Container, ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import { useBookRequests } from "@/lib/react-query/books";
import { useRouter } from "expo-router";
import { ActivityIndicator, Platform, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { AddButton } from "./components/add-button";
import { RequestCard } from "./components/request-card";

export default function Requests() {
  const router = useRouter();
  const isIos = Platform.OS === "ios";

  const { data: requests, isLoading } = useBookRequests();

  console.log({ requests });

  const handleAddRequest = () => {
    router.navigate("/book/request-book");
  };

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
