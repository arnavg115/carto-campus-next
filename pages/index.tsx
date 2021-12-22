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

const query = gql`
  query {
    hello
  }
`;

const Home: NextPage = () => {
  const Auth = useAuthUser();

  return (
    <CartoPage auth={Auth} landing>
      <SplashBox />
      <Box background="#2b2b2b" pad="medium">
        <CartoCarousel />
      </Box>
      <CardGrid cards={HomeCards} />
    </CartoPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
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

    return {
      props: {
        init: data.hello,
      },
    };
  }
);

export default withAuthUser()(Home);
