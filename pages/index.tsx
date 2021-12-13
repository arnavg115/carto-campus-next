import type { NextPage } from "next";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { Box } from "grommet";

import Navbar from "../components/NavBar";
import CartoFooter from "../components/CartoFooter";
import NotificationPanel from "../components/NotificationPanel";
import SplashBox from "../components/SplashBox";
import CartoCarousel from "../components/Carousel";
import CardGrid from "../components/CardGrid";
import { HomeCards } from "../lib/contents";
const Home: NextPage = () => {
  const Auth = useAuthUser();

  return (
    <div>
      <NotificationPanel />
      <Navbar authenticated={!!Auth.email} />
      <SplashBox />
      <Box background="#2b2b2b" pad="medium">
        <CartoCarousel />
      </Box>
      <CardGrid cards={HomeCards} />
      <CartoFooter />
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Home);
