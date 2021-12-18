import Head from "next/head";
import React from "react";

const HeadComponent = () => {
  return (
    <Head>
      <meta charSet="utf-8" />
      <link rel="icon" href="./carto-campus-dark.ico" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />
      <meta name="description" content="Going the Extra Mile" />
      {/* <link rel="apple-touch-icon" href="%PUBLIC_URL%/logo192.png" /> */}

      {/* <link rel="manifest" href="%PUBLIC_URL%/manifest.json" /> */}

      <title>Carto-Campus</title>
      <meta name="title" content="Carto-Campus" />
      <meta name="description" content="Going the Extra Mile" />

      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://carto-campus.web.app/" />
      <meta property="og:title" content="Carto-Campus" />
      <meta property="og:description" content="Going the Extra Mile" />
      <meta
        property="og:image"
        content="https://carto-campus.web.app/carto-campus-dark.png"
      />

      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content="https://carto-campus.web.app/" />
      <meta property="twitter:title" content="Carto-Campus" />
      <meta property="twitter:description" content="Going the Extra Mile" />
      <meta
        property="twitter:image"
        content="https://carto-campus.web.app/carto-campus-dark.png"
      />
    </Head>
  );
};

export default HeadComponent;
