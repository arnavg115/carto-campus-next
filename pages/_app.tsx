import type { AppProps } from "next/app";
import initAuth from "../lib/initFirebase";
import "../styles/globals.css";

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
