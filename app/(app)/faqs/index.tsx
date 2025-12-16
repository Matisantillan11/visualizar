import { Accordion, Container, ThemedText } from "@/components/UI";
import { ScrollView, View } from "react-native";
import FaqContent, { FaqSubContent } from "./components/faq-content";
import { FAQS } from "./constants";

export default function Faqs() {
  return (
    <Container gradient withNavbar>
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

      <ScrollView style={{ marginBottom: 30 }}>
        {FAQS.map((faq, index) => (
          <Accordion
            title={faq.title}
            isDefaultExpanded={index === 0 || index === 1}
            key={index}
          >
            <FaqContent content={faq.content} />
            {faq.subContent ? (
              <View style={{ marginTop: 20 }}>
                {faq.subContent.map((subContent, index) => (
                  <FaqSubContent
                    content={`${subContent.title}: ${subContent.content}`}
                    key={index}
                  />
                ))}
              </View>
            ) : null}
          </Accordion>
        ))}
      </ScrollView>
    </Container>
  );
}
