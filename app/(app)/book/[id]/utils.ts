import { Animation } from "../types/book";

export const parseAnimations = (animations: Animation[]) => {
  const models: { name: string; model: string; textures: string }[] = [];
  if (animations && animations.length > 0) {
    const animationKeys = Object.keys(animations[0]);

    if (animationKeys.length > 0) {
      animationKeys.forEach((key) => {
        models.push({
          name: key,
          model: animations[0]?.[key as keyof Animation]?.source,
          textures: animations[0]?.[key as keyof Animation]?.texture,
        });
      });
    }

    return models;
  }
  return [];
};
