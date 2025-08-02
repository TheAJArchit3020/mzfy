const { getDefaultConfig, mergeConfig } = require("@react-native/metro-config");
const path = require("path")
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('@react-native/metro-config').MetroConfig}
 */
const config = {
  resolver: {
    // Add extra extensions (if needed)
    sourceExts: ["jsx", "js", "ts", "tsx", "json", "cjs"],

    // Add extra node modules alias (optional)
    extraNodeModules: {
      "@components": path.resolve(__dirname, "src/components"),
      "@utils": path.resolve(__dirname, "src/utils"),
    },
  },
};

module.exports = mergeConfig(getDefaultConfig(__dirname), config);
