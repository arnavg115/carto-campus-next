import { ApolloProvider } from "@apollo/client";
import { grommet, Grommet, ThemeType } from "grommet";
import { useApollo } from "../lib/apollo";
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
  const client = useApollo(pageProps.initialApolloState);
  return (
    <ApolloProvider client={client}>
      <Grommet theme={customTheme}>
        <HeadComponent />
        <Component {...pageProps} />
      </Grommet>
    </ApolloProvider>
  );
}

export default MyApp;
