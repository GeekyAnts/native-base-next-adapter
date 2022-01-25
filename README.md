# @native-base/next-adapter

### Manual Installation

- yarn add **@native-base/next-adapter** next-compose-plugins next-transpile-modules next-fonts  -D
- yarn add react-native-web native-base react-native-svg react-native-safe-area-context
- Re-export the custom `Document` component in the **pages/_document.js** file of your Next.js project.
    - This will ensure `react-native-web` styling works.
    - Wraps all the css in style tag on server side (thus preventing css flicker issue)
    - Or you can create the file - `mkdir pages; touch pages/_document.js`
    
    **pages/_document.js**
    
    `export { default } from '@native-base/next-adapter/document';`
    
- Update next.config.json with below code

  Custom withNativebase function implements withPlugins function from [next-compose-plugins](https://github.com/cyrilwanner/next-compose-plugins#usage).

  WithNativebase function takes in 3 parameters :

      `[plugin: function, configuration?: object, phases?: array]`

```jsx
const { withNativebase } = require("@native-base/next-adapter");

module.exports = withNativebase([], {
  projectRoot: __dirname,
});
```

- Incase we want to transpile some packages using `next-transpile-modules` we can pass the              name of modules as first parameter in plugin as array.
- Incase you want to add extra configurations in webpack, we need to override the configuration provided by adapter and combine native-base webpack configurations with custom configuration.

      

```jsx
module.exports = withNativebase(
  [
    [
      "@expo/next-adapter",
      "react-native-vector-icons",
      "react-native-vector-icons-for-web",
    ],
  ],
  {
    projectRoot: __dirname,
    webpack: (config, options) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        // Transform all direct `react-native` imports to `react-native-web`
        "react-native": "react-native-web",
        "@expo/vector-icons": "react-native-vector-icons",
      };
      config.resolve.extensions = [
        ".web.js",
        ".web.ts",
        ".web.tsx",
        ...config.resolve.extensions,
      ];
      return config;
    },
  }
);
```
