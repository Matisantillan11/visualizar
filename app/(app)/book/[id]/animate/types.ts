export interface Model {
  type: string;
  name: string;
  isometric?: boolean;
  model: any;
  textures: {
    image: any;
  }[];
  scale?: {
    x: number;
    y: number;
    z: number;
  };
  position: {
    x: number;
    y: number;
    z: number;
  };
  animation?: {
    rotation: {
      x?: number;
      y?: number;
    };
  };
}
