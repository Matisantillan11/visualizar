import { Accordion, Container, ThemedText } from "@/components/UI";
import { ScrollView, View } from "react-native";
import FaqContent from "./components/faq-content";
import { FAQS } from "./constants";

export default function Faqs() {
  return (
    <Container gradient withNavbar>
      <ScrollView>
        <View
          style={{
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            marginTop: -40,
            marginBottom: 30,
          }}
        >
          <ThemedText>Preguntas Frecuentes</ThemedText>
        </View>

        {FAQS.map((faq, index) => (
          <Accordion
            title={faq.title}
            isDefaultExpanded={index === 0 || index === 1}
            key={index}
          >
            <FaqContent content={faq.content} />
          </Accordion>
        ))}
      </ScrollView>
    </Container>
  );
}
