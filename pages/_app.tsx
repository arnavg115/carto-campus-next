import { grommet, Grommet, ThemeType } from "grommet";
import { deepMerge } from "grommet/utils";
import type { AppProps } from "next/app";
import HeadComponent from "../components/Head";
import initAuth from "../lib/initFirebase";
import "../styles/globals.css";

initAuth();
const customTheme = deepMerge(grommet, {
  global: {
    colors: {
      focus: "#0070F3",
      brand: "red",
    },
  },
} as ThemeType);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Grommet theme={customTheme}>
      <HeadComponent />
      <Component {...pageProps} />
    </Grommet>
  );
}

export default MyApp;
