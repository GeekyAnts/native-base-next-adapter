import React, { Children } from "react";
import NextDocument, { Html, Head, Main, NextScript } from "next/document";
import { AppRegistry } from "react-native-web";

// Force Next-generated DOM elements to fill their parent's height
const normalizeNextElements = `
  #__next {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
`;

export async function getInitialProps({ renderPage }) {
  AppRegistry.registerComponent("Main", () => Main);
  const { getStyleElement } = AppRegistry.getApplication("Main");
  const page = renderPage();
  const styles = [
    // eslint-disable-next-line react/jsx-key
    <style dangerouslySetInnerHTML={{ __html: normalizeNextElements }} />,
    getStyleElement(),
  ];
  return { ...page, styles: Children.toArray(styles) };
}
class Document extends NextDocument {
  render() {
    return (
      <Html>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
Document.getInitialProps = getInitialProps;
export default Document;
