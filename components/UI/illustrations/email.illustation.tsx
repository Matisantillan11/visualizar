import * as React from "react";

import Svg, { ClipPath, Defs, G, Path, Rect, SvgProps } from "react-native-svg";
export const EmailIllustration = (props: SvgProps) => (
  <Svg width={125} height={125} fill="none" {...props}>
    <Rect width={125} height={125} fill="#5F5DF7" fillOpacity={0.4} rx={33.7} />
    <G clipPath="url(#a)">
      <Path
        fill="#5F5DF7"
        d="M89.667 35.333H36.333c-3.666 0-6.633 3-6.633 6.667l-.033 40c0 3.667 3 6.667 6.666 6.667h53.334c3.666 0 6.666-3 6.666-6.667V42c0-3.667-3-6.667-6.666-6.667Zm0 13.334L63 65.333 36.333 48.667V42L63 58.667 89.667 42v6.667Z"
      />
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M23 22h80v80H23z" />
      </ClipPath>
    </Defs>
  </Svg>
);
