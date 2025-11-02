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
        x: 0.7,
        y: 0.7,
        z: 0.7,
      }
    : {
        x: 5,
        y: 5,
        z: 5,
      };

  const position = fileName?.includes("dato-curioso")
    ? {
        x: 0,
        y: 3,
        z: 0,
      }
    : {
        x: 0,
        y: 2,
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
