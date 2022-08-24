import Document, { Head, Html, Main, NextScript } from "next/document";

import React from "react";
import Script from "next/script";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="zh">
        <Head>
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link
            href="https://fonts.googleapis.com/css2?family=Source+Code+Pro:wght@400&display=swap"
            rel="stylesheet"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
          <Script src="/pangu.min.js" strategy="beforeInteractive" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
