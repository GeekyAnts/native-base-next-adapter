## Table of Contents

1. About The Project
2. Built With
3. Usage
4. Contributing

## About the project

This project was designed to make integration of nativebase in next apps easier

[Next.js](https://nextjs.org/) is a React framework that provides simple page-based routing as well as server-side rendering. To use Next.js with native-base for web we recommend that you use a library called [@native-base/next-adapter](https://github.com/GeekyAnts/native-base-next-adapter) to handle the configuration and integration of the tools.

## Built With

- next
- react
- react-dom
- typescript
- tsc
- react-native-web

### Usage

- ``` 
  yarn add @native-base/next-adapter next-compose-plugins next-transpile-modules next-fonts  -D
  ```
- ```
  yarn add react-native-web native-base react-native react-native-svg react-native-safe-area-context
  ```
- Re-export the custom `Document` component in the **`pages/_document.js`** file of your NextJs project.
    - This will ensure `react-native-web` styling works.
    - Wraps all the css in style tag on server side (thus preventing css flicker issue)
    - Or you can create the file - `mkdir pages; touch pages/_document.js`
    
    **pages/_document.js**
    
    ```jsx
    export { default } from '@native-base/next-adapter/document';
    ```
    
- Update `next.config.json` with below code

  Custom withNativebase function implements withPlugins function from [next-compose-plugins](https://github.com/cyrilwanner/next-compose-plugins#usage).

  WithNativebase function takes in 2 parameters :

```jsx
type withNativebaseParam = {
  config: ConfigType;
  phase?: Array;
}

type ConfigType = {
  dependencies?: Array<string>;
  plugins?: Array<function>;
  nextConfig?: Object;
};
```

 
### 1. Config parameter is an object with 3 keys:

- dependencies: List of dependencies which are transpiled using `[next-transpile-modules](https://github.com/martpie/next-transpile-modules)` .

```jsx
const { withNativebase } = require("@native-base/next-adapter");

module.exports = withNativebase({
  dependencies: [
  ],
});
```

- plugins: It is an array containing all plugins and their configuration.

```jsx
const { withNativebase } = require("@native-base/next-adapter");
const sass = require("@zeit/next-sass");

module.exports = withNativebase({
  plugins: [[sass]],  
});
```

- nextConfig: Configuration for the plugin. You can also overwrite specific configuration keys for a phase.

```jsx
const { withNativebase } = require("@native-base/next-adapter");

module.exports = withNativebase({
  nextConfig: {
    projectRoot: __dirname,
    webpack: (config, options) => {
      config.resolve.alias = {
        ...(config.resolve.alias || {}),
        "react-native$": "react-native-web",
      };
      config.resolve.extensions = [
        ".web.js",
        ".web.ts",
        ".web.tsx",
        ...config.resolve.extensions,
      ];
      return config;
    },
  },
});
```

### 2. Phase

If the plugin should only be applied in specific phases, you can specify them here. You can   use  all phases [next.js provides](https://github.com/zeit/next.js/blob/canary/packages/next/next-server/lib/constants.ts#L1-L4).

```jsx
const withPlugins = require('next-compose-plugins');
const { PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD } = require('next/constants');
const sass = require('@zeit/next-sass');

module.exports = withPlugins([
  [sass, {
    cssModules: true,
    cssLoaderOptions: {
      localIdentName: '[path]___[local]___[hash:base64:5]',
    },
  }, [PHASE_DEVELOPMENT_SERVER, PHASE_PRODUCTION_BUILD]],
]);
```

[screen-recording-2022-01-25-at-15211-pm_5Y7ZUfga (1).mp4](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/f5b548ae-324a-4de9-8264-91f68254c1db/screen-recording-2022-01-25-at-15211-pm_5Y7ZUfga_(1).mp4)

## **Contributing**

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement". Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
