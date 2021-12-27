import type { NextPage } from "next";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { Box } from "grommet";

import SplashBox from "../components/SplashBox";
import CartoCarousel from "../components/Carousel";
import CardGrid from "../components/CardGrid";
import { HomeCards } from "../lib/contents";
import { CartoPage } from "../components/CartoPage";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";
import { parseCookies } from "../lib/parseCookies";

const query = gql`
  query {
    hello
  }
`;

const Home: NextPage = (props: any) => {
  const Auth = useAuthUser();

  return (
    <CartoPage auth={Auth} landing open={props.open}>
      <SplashBox />
      <Box background="#2b2b2b" pad="medium">
        <CartoCarousel />
      </Box>
      <CardGrid cards={HomeCards} />
    </CartoPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser, req }) => {
    const token = await AuthUser.getIdToken()!;
    const client = initializeApollo();
    const { data } = await client.query({
      query,
      context: {
        headers: {
          authorization: `Bearer ${token}`,
        },
      },
    });
    const cookies = parseCookies(req);

    return {
      props: {
        init: data.hello,
        open: cookies.open !== "false",
      },
    };
  }
);

export default withAuthUser()(Home);
