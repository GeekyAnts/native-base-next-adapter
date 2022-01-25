type withNativebaseParam = {
  plugin: any;
  nextConfig?: any;
  phase?: Array<any>;
};

export default function withNativebase({
  plugin = [],
  nextConfig = {},
  phase = [],
}: withNativebaseParam) {
  // const { webpack, ...config } = nextConfig;
  let dependencies = [
    "native-base",
    "react-native-svg",
    "react-native-web",
    "react-native-safe-area-context",
    "@react-aria/visually-hidden",
    "@react-native-aria/button",
    "@react-native-aria/checkbox",
    "@react-native-aria/combobox",
    "@react-native-aria/focus",
    "@react-native-aria/interactions",
    "@react-native-aria/listbox",
    "@react-native-aria/overlays",
    "@react-native-aria/radio",
    "@react-native-aria/slider",
    "@react-native-aria/tabs",
    "@react-native-aria/utils",
    "@react-stately/combobox",
    "@react-stately/radio",
    "@native-base/next-adapter",
  ];
  if (plugin[0] !== undefined) {
    dependencies = [...dependencies, ...plugin[0]];
  }
  const withPlugins = require("next-compose-plugins");
  const withFonts = require("next-fonts");
  const withTM = require("next-transpile-modules")(dependencies);

  return withPlugins(
    [
      withTM,
      [withFonts, { projectRoot: __dirname }],
      ...plugin,
      // your plugins go here.
    ],
    {
      webpack: (config, options) => {
        config.resolve.alias = {
          ...(config.resolve.alias || {}),
          // Transform all direct `react-native` imports to `react-native-web`
          "react-native$": "react-native-web",
          // "@expo/vector-icons": "react-native-vector-icons",
        };
        config.resolve.extensions = [
          ".web.js",
          ".web.ts",
          ".web.tsx",
          ...config.resolve.extensions,
        ];
        return config;
      },
      ...nextConfig,
    },
    [...phase]
  );
}
