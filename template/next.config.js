// const path = require("path");
// const withPlugins = require("next-compose-plugins");
// const withTM = require("next-transpile-modules")([
//   "native-base",
//   "react-native-svg",
//   // "react-native-vector-icons-for-web",
//   "react-native-web",
//   "react-native-safe-area-context",
//   "@react-aria/visually-hidden",
//   "@react-native-aria/button",
//   "@react-native-aria/checkbox",
//   "@react-native-aria/combobox",
//   "@react-native-aria/focus",
//   "@react-native-aria/interactions",
//   "@react-native-aria/listbox",
//   "@react-native-aria/overlays",
//   "@react-native-aria/radio",
//   "@react-native-aria/slider",
//   "@react-native-aria/tabs",
//   "@react-native-aria/utils",
//   "@react-stately/combobox",
//   "@react-stately/radio",
// ]);

// module.exports = withPlugins(
//   [
//     withTM,
//     // your plugins go here.
//   ],
//   {
//     webpack: (config, options) => {
//       config.resolve.alias = {
//         ...(config.resolve.alias || {}),
//         // Transform all direct `react-native` imports to `react-native-web`
//         "react-native$": "react-native-web",import withNativebase from '../src/withNativebase';

//       };
//       config.resolve.extensions = [
//         ".web.js",
//         ".web.ts",
//         ".web.tsx",
//         ...config.resolve.extensions,
//       ];
//       return config;
//     },
//     experimental: {
//       externalDir: true,
//     },
//   }
// );

const { withNativebase } = require("./withNativebase");

module.exports = withNativebase({
  experimental: {
    externalDir: true,
  },
  projectRoot: __dirname,
});
