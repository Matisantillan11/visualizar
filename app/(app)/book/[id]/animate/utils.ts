import { Model } from "./types";

export function createModelFromUrls(
  modelUrl: string,
  textureUrl: string
): Model | null {
  const urlParts = modelUrl.split("/");

  if (urlParts.length === 0) {
    return null;
  }

  const fileNameWithExt = urlParts[urlParts.length - 1];
  const fileName = fileNameWithExt?.replace(".obj", "");
  const scale = fileName?.includes("dato-curioso")
    ? {
        x: 0.6,
        y: 0.6,
        z: 0.6,
      }
    : {
        x: 5,
        y: 5,
        z: 5,
      };

  const position = fileName?.includes("dato-curioso")
    ? {
        x: 0,
        y: 1,
        z: 0,
      }
    : {
        x: 0,
        y: 0,
        z: 0,
      };

  const animation = fileName?.includes("dato-curioso")
    ? {
        rotation: {
          y: 0,
        },
      }
    : {
        rotation: {
          y: 0.01,
        },
      };

  return {
    type: "obj",
    name: fileName,
    isometric: false,
    model: modelUrl,
    textures: [
      {
        image: textureUrl,
      },
    ],
    scale,
    position,
    animation,
  } as Model;
}
