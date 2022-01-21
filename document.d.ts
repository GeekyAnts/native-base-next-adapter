import NextDocument from "next/document";
export default class Document extends NextDocument {
    static getInitialProps({ renderPage }: {
        renderPage: any;
    }): Promise<any>;
    render(): any;
}
