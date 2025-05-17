import { Image } from "expo-image";
import EdIllustration from "../../../assets/images/ed.png";
import { BlurView } from "../blur-view/blur-view.component";

export default function Ed() {
  return (
    <BlurView top={-10} left={-20}>
      {/* Avatar */}
      <Image
        source={EdIllustration}
        style={{
          width: 135,
          height: 135,
          zIndex: 1,
          transform: [{ rotate: "-15deg" }],
        }}
      />
    </BlurView>
  );
}
