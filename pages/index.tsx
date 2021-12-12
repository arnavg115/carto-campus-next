import type { NextPage } from "next";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import {
  Box,
  Heading,
  Button,
  Carousel,
  Image,
  Card,
  CardBody,
  CardHeader,
} from "grommet";
import {
  FormLock,
  Deploy,
  Trigger,
  Accessibility,
  Location,
  Organization,
} from "grommet-icons";
import Navbar from "../components/NavBar";
import CartoFooter from "../components/CartoFooter";
import NotificationPanel from "../components/NotificationPanel";
import SplashBox from "../components/SplashBox";
import CartoCarousel from "../components/Carousel";

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
      <Box
        pad="large"
        alignContent="center"
        alignSelf="center"
        align="center"
        gap="large"
        direction="row"
        background="black"
        style={{
          textAlign: "center",
        }}
      >
        <Card
          background="light-1"
          align="center"
          alignContent="center"
          round="large"
          className="card"
        >
          <CardHeader margin={{ top: "30px" }}>
            <Deploy size="45px" color="red" />
            <Heading size="40px">Fast</Heading>
          </CardHeader>
          <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
            <Heading textAlign="center" size="20px">
              Through the use of many well-known external softwares, our product
              has incredible response rates. Navigation occurs almost instantly
              after the request, and signing up can be completed in less than a
              minute.{" "}
            </Heading>
          </CardBody>
        </Card>
        <Card
          background="light-1"
          align="center"
          alignContent="center"
          round="large"
          className="card"
        >
          <CardHeader margin={{ top: "30px" }}>
            <FormLock size="45px" color="red" />
            <Heading size="40px">Safe</Heading>
          </CardHeader>
          <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
            <Heading alignSelf="center" textAlign="center" size="20px">
              We are currently using Firebase to store information and deploying
              our product on Vercel. Firebase provides our application with
              secure authentication of users, a database, and Vercel provides
              safe hosting for our web app.{""}
            </Heading>
          </CardBody>
        </Card>
        <Card
          className="card"
          background="light-1"
          align="center"
          alignContent="center"
          round="large"
        >
          <CardHeader margin={{ top: "30px" }}>
            <Trigger size="45px" color="red" />
            <Heading size="40px">Reliable</Heading>
          </CardHeader>
          <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
            <Heading textAlign="center" size="20px">
              We use many well-known external softwares to help with the
              deployment and production build of our website, such as Vercel,
              Firebase, and Mapbox. These systems allow for quicker response and
              seamless navigation.{" "}
            </Heading>
          </CardBody>
        </Card>
      </Box>
      <CartoFooter />
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Home);
