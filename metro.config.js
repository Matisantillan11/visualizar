const { getDefaultConfig } = require("expo/metro-config");
const config = getDefaultConfig(__dirname);
config.resolver.assetExts.push("glb", "gltf");
config.resetCache = true;
module.exports = config;
