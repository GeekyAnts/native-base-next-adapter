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


## Steps to integrate icons in Nextjs with native-base
- yarn add @expo/next-adapter react-native-vector-icons @expo/vector-icons
- We need to overwrite `next.config.js`  with custom webpack configurations

```jsx
const { withNativebase } = require("@native-base/next-adapter");

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

- Re-export the custom `Document` component in the **pages/_document.js** file of your Next.js project.
    - This will ensure all fonts are loaded in style tag.
    - Or you can create the file - `mkdir pages; touch pages/_document.js`
    
    **pages/_document.js**
    
    ```jsx
    import { default as NativebaseDocument } from "@native-base/next-adapter/document";
    import NextDocument, { Html, Head, Main, NextScript } from "next/document";
    export { default as ExpoDocument } from "@expo/next-adapter/document";
    import EntypoFont from "react-native-vector-icons/Fonts/Entypo.ttf";
    import AntDesignFont from "react-native-vector-icons/Fonts/AntDesign.ttf";
    import EvilIconsFont from "react-native-vector-icons/Fonts/EvilIcons.ttf";
    import FeatherFont from "react-native-vector-icons/Fonts/Feather.ttf";
    import FontAwesomeFont from "react-native-vector-icons/Fonts/FontAwesome.ttf";
    import FontistoFont from "react-native-vector-icons/Fonts/Fontisto.ttf";
    import FoundationFont from "react-native-vector-icons/Fonts/Foundation.ttf";
    import IoniconsFont from "react-native-vector-icons/Fonts/Ionicons.ttf";
    import MaterialCommunityIconsFont from "react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf";
    import MaterialIconsFont from "react-native-vector-icons/Fonts/MaterialIcons.ttf";
    import OcticonsFont from "react-native-vector-icons/Fonts/Octicons.ttf";
    import SimpleLineIconsFont from "react-native-vector-icons/Fonts/SimpleLineIcons.ttf";
    import ZocialFont from "react-native-vector-icons/Fonts/Zocial.ttf";
    import * as React from "react";
    import { AppRegistry } from "react-native";
    
    class Document extends NativebaseDocument {
      render() {
        return (
          <Html style={{ height: "100%" }}>
            <Head />
            <body style={{ height: "100%", overflow: "hidden" }}>
              <Main />
              <NextScript />
            </body>
          </Html>
        );
      }
    }
    
    export const style = `
    /**
     * Building on the RNWeb reset:
     * https://github.com/necolas/react-native-web/blob/master/packages/react-native-web/src/exports/StyleSheet/initialRules.js
     */
    html, body, #__next {
      width: 100%;
      /* To smooth any scrolling behavior */
      -webkit-overflow-scrolling: touch;
      margin: 0px;
      padding: 0px;
      /* Allows content to fill the viewport and go beyond the bottom */
      min-height: 100%;
    }
    @font-face {
      src: url(${EntypoFont});
      font-family: Entypo;
    }
    @font-face {
      src: url(${EvilIconsFont});
      font-family: EvilIcons;
    }
    @font-face {
      src: url(${FontAwesomeFont});
      font-family: FontAwesome;
    }
    @font-face {
      src: url(${FeatherFont});
      font-family: Feather;
    }
    @font-face {
      src: url(${IoniconsFont});
      font-family: Ionicons;
    }
    @font-face {
      src: url(${FoundationFont});
      font-family: Foundation;
    }
    @font-face {
      src: url(${MaterialIconsFont});
      font-family: MaterialIcons;
    }
    @font-face {
      src: url(${MaterialCommunityIconsFont});
      font-family: MaterialCommunityIcons;
    }
    @font-face {
      src: url(${ZocialFont});
      font-family: Zocial;
    }
    @font-face {
      src: url(${SimpleLineIconsFont});
      font-family: SimpleLineIcons;
    }
    @font-face {
      src: url(${OcticonsFont});
      font-family: Octicons;
    }
    @font-face {
      src: url(${FontistoFont});
      font-family: Fontisto;
    }
    @font-face {
      src: url(${AntDesignFont});
      font-family: AntDesign;
    }
    #__next {
      flex-shrink: 0;
      flex-basis: auto;
      flex-direction: column;
      flex-grow: 1;
      display: flex;
      flex: 1;
    }
    html {
      scroll-behavior: smooth;
      /* Prevent text size change on orientation change https://gist.github.com/tfausak/2222823#file-ios-8-web-app-html-L138 */
      -webkit-text-size-adjust: 100%;
      height: 100%;
    }
    body {
      display: flex;
      /* Allows you to scroll below the viewport; default value is visible */
      overflow-y: auto;
      overscroll-behavior-y: none;
      text-rendering: optimizeLegibility;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      -ms-overflow-style: scrollbar;
    }
    `;
    
    export async function getInitialProps({ renderPage }) {
      AppRegistry.registerComponent("Main", () => Main);
      const { getStyleElement } = AppRegistry.getApplication("Main");
      const page = await renderPage();
      const styles = [
        // eslint-disable-next-line react/jsx-key
        <style dangerouslySetInnerHTML={{ __html: style }} />,
        getStyleElement(),
      ];
      return { ...page, styles: React.Children.toArray(styles) };
    }
    Document.getInitialProps = getInitialProps;
    
    export default Document;
    ```
    

- Create a **babel.config.js** and use `[babel-preset-expo](https://github.com/expo/expo/tree/master/packages/babel-preset-expo)`
    - You may have installed this earlier with `yarn add -D babel-preset-expo`**babel.config.js**
    
    ```jsx
    module.exports = {
      presets: ["@expo/next-adapter/babel"],
    };
    ```
    

- Then we can directly use icons

 

```jsx
import React from "react";
import { Box, Icon } from "native-base";
import Entypo from "@expo/vector-icons/Entypo";

export default function App() {
  return (
    <Box>
      <Icon
        as={Entypo}
        name="user"
        color="coolGray.800"
        _dark={{
          color: "warmGray.50",
        }}
      />
    </Box>
  );
}
```
