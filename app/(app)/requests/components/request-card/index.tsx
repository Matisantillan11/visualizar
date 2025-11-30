import { getReverseAnimationsSelected } from "@/app/(app)/book/request-book/helpers";
import { ThemedText, ThemedTextVariants } from "@/components/UI";
import Pill from "@/components/UI/pill";
import { theme } from "@/constants";
import { BookRequest } from "@/lib/react-query/books";
import { View } from "react-native";
import { CardDetails } from "./card-details";

export const RequestCard = ({ request }: { request: BookRequest }) => {
  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <View
      style={{
        width: "100%",
        minHeight: 120,
        borderBottomColor: theme.primary.brand900,
        borderBottomWidth: 1,
        borderRadius: 12,
        paddingVertical: 16,
        paddingHorizontal: 8,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flex: 1,
          marginBottom: 8,
        }}
      >
        <ThemedText
          variant={ThemedTextVariants.default}
          style={{
            color: theme.base.white,
            fontWeight: "bold",
            fontSize: 16,
          }}
        >
          {request?.title}
        </ThemedText>

        <Pill label={request?.status} />
      </View>
      <View>
        <CardDetails label="Autor" value={request?.authorName} />

        <CardDetails label="Comentarios" value={request?.comments} />

        <CardDetails
          label="Animaciones"
          value={getReverseAnimationsSelected(request?.animations)}
        />

        <CardDetails
          label="Fecha de solicitud"
          value={formatDate(request?.createdAt)}
        />
      </View>
    </View>
  );
};
