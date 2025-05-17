import { theme } from "@/constants";
import { Image } from "expo-image";
import { useWindowDimensions } from "react-native";
import JustinIllustration from "../../../assets/images/justin.png";
import { BlurView } from "../blur-view/blur-view.component";
export default function Justin() {
  const { width } = useWindowDimensions();
  return (
    <BlurView top={100} left={width / 5} color={theme.error.error100}>
      {/* Avatar */}
      <Image
        source={JustinIllustration}
        style={{
          width: 135,
          height: 135,
          zIndex: 1,
        }}
      />
    </BlurView>
  );
}
