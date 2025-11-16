import { ThemedText, ThemedTextVariants } from "@/components/UI";
import { theme } from "@/constants";
import { ListItem } from "@rneui/base";
import { useState } from "react";
import { Icon } from "react-native-paper";

export default function Accordion({
  title,
  children,
  isDefaultExpanded = false,
}: {
  title: string;
  children: React.ReactNode;
  isDefaultExpanded?: boolean;
}) {
  const [expanded, setExpanded] = useState(isDefaultExpanded);

  const handlePress = () => {
    setExpanded(!expanded);
  };

  return (
    <ListItem.Accordion
      containerStyle={{ backgroundColor: "transparent" }}
      icon={<Icon source="chevron-down" size={20} color={theme.base.white} />}
      content={
        <ListItem.Content>
          <ThemedText
            variant={ThemedTextVariants.default}
            style={{
              fontSize: 20,
            }}
          >
            {title}
          </ThemedText>
        </ListItem.Content>
      }
      isExpanded={expanded}
      onPress={() => handlePress()}
    >
      <ListItem
        containerStyle={{
          backgroundColor: "transparent",
        }}
      >
        <ListItem.Content>{children}</ListItem.Content>
      </ListItem>
    </ListItem.Accordion>
  );
}
