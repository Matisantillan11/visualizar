import { decode } from "base64-arraybuffer";
import { resolveAsync } from "expo-asset-utils";
import { File } from "expo-file-system";
import { loadTextureAsync, THREE } from "expo-three";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MTLLoader } from "three/examples/jsm/loaders/MTLLoader.js";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";

async function loadFileAsync({
  asset,
  funcName,
}: {
  asset: any;
  funcName: string;
}) {
  if (!asset) {
    throw new Error(`ExpoTHREE.${funcName}: Cannot parse a null asset`);
  }
  return (await resolveAsync(asset)).localUri ?? null;
}

async function readFileAsBase64(uri: string): Promise<string> {
  try {
    const file = new File(uri);
    // Use the base64() method directly from the File class
    return await file.base64();
  } catch (error) {
    throw new Error(`Failed to read file as base64: ${uri}. Error: ${error}`);
  }
}

export async function loadFbxAsync({
  asset,
  onAssetRequested,
}: {
  asset: any;
  onAssetRequested?: any;
}) {
  const uri = await loadFileAsync({
    asset,
    funcName: "loadFbxAsync",
  });
  if (!uri) return;
  const base64 = await readFileAsBase64(uri);
  const arrayBuffer = decode(base64);
  const loader = new FBXLoader();
  return loader.parse(arrayBuffer, onAssetRequested);
}
export async function loadGLTFAsync({
  asset,
  onAssetRequested,
}: {
  asset: any;
  onAssetRequested?: any;
}) {
  const uri = await loadFileAsync({
    asset,
    funcName: "loadGLTFAsync",
  });
  if (!uri) return;
  const base64 = await readFileAsBase64(uri);
  const arrayBuffer = decode(base64);
  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.parse(
      arrayBuffer,
      onAssetRequested,
      (result) => {
        resolve(result);
      },
      (err) => {
        reject(err);
      }
    );
  });
}

export async function loadObjAsync({
  asset,
  mtlAsset,
}: {
  asset: any;
  mtlAsset?: any;
}) {
  const uri = await loadFileAsync({
    asset,
    funcName: "loadObjAsync",
  });
  if (!uri) return;

  // Load MTL file if provided
  let materials: any = null;
  if (mtlAsset) {
    const mtlUri = await loadFileAsync({
      asset: mtlAsset,
      funcName: "loadObjAsync",
    });
    if (mtlUri) {
      const mtlText = await readFileAsText(mtlUri);
      const mtlLoader = new MTLLoader();
      // Extract base path from URI (directory containing the MTL file)
      const basePath = mtlUri.substring(0, mtlUri.lastIndexOf("/") + 1);
      materials = mtlLoader.parse(mtlText, basePath);
    }
  }

  const objText = await readFileAsText(uri);
  const objLoader = new OBJLoader();

  if (materials) {
    materials.preload();
    objLoader.setMaterials(materials);
  }

  return objLoader.parse(objText);
}

async function readFileAsText(uri: string): Promise<string> {
  try {
    const file = new File(uri);
    return await file.text();
  } catch (error) {
    throw new Error(`Failed to read file as text: ${uri}. Error: ${error}`);
  }
}

export const loadModel = async function (item: any) {
  const texturesLength = item.textures?.length || 0;
  console.log(`[loadModel] -> Textures length: ${texturesLength}`);
  const textures: any[] = [];
  for (let i = 0; i < texturesLength; i++) {
    const texture = await loadTextureAsync({
      asset: item.textures[i].image,
    });
    if (item.type === "glb") {
      texture.flipY = false;
    }
    textures.push({ name: item.textures[i]?.name || "-", map: texture });
  }
  console.log(`[loadModel] -> Textures done loading`);
  // console.log(textures);

  let obj = null;
  if (item.type === "obj") {
    obj = await loadObjAsync({
      asset: item.model,
      mtlAsset: item?.material || undefined,
    });
  } else if (item.type === "fbx") {
    obj = await loadFbxAsync({ asset: item.model });
  } else if (item.type === "gltf" || item.type === "glb") {
    const result: any = await loadGLTFAsync({ asset: item.model });
    console.log(result);
    obj = result.scene;
  }

  console.log(`[loadModel] -> Model done loading, adding textures now...`);

  if (texturesLength > 0) {
    if (texturesLength === 1) {
      obj.traverse(function (object: any) {
        if (object instanceof THREE.Mesh) {
          object.material.map = textures[0]?.map;
        }
      });
    } else {
      obj.traverse(function (object: any) {
        if (object instanceof THREE.Mesh) {
          // console.log(
          //   `[loadModel] -> Traverse object name: ${object.name}`,
          // );
          // console.log(object);
          const selected = textures?.find((x) => x.name === object.name);
          object.material.map = selected?.map;
        }
      });
    }
  }
  console.log(`[loadModel] -> Textures done applied...`);

  if (item.scale) {
    obj.scale.set(item.scale.x, item.scale.y, item.scale.z);
  }
  if (item.position) {
    obj.position.set(item.position.x, item.position.y, item.position.z);
  }
  if (item.rotation) {
    obj.rotation.x = item.rotation.x;
    obj.rotation.y = item.rotation.y;
    obj.rotation.z = item.rotation.z;
  }
  return obj;
};
