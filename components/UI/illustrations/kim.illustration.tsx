import { theme } from "@/constants";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import KimIllustration from "../../../assets/images/kim.png";
import { BlurView } from "../blur-view/blur-view.component";
export default function Kim() {
  const { width } = useWindowDimensions();
  return (
    <BlurView top={-10} left={width / 2.75} color={theme.warning.warning100}>
      {/* Avatar */}
      <Image
        source={KimIllustration}
        style={{
          width: 135,
          height: 135,
          zIndex: 1,
          transform: [{ rotate: "5deg" }],
        }}
      />
    </BlurView>
  );
}
