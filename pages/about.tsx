import Navbar from "../components/NavBar";
import CartoFooter from "../components/CartoFooter";
import { Box, Heading, Card, CardBody, CardHeader } from "grommet";

import { Group, Target, Notification, Help } from "grommet-icons";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import CardGrid from "../components/CardGrid";
import { AboutCards } from "../lib/contents";

function About() {
  const Auth = useAuthUser();
  return (
    <div>
      <Navbar authenticated={!!Auth.email} />
      <Box background="#1c1c1c">
        <Box
          align="center"
          pad="large"
          style={{
            background: `linear-gradient(
                rgba(0, 0, 0, 0.4), 
                rgba(0, 0, 0, 0.4)
              ),url('./bayarea-ss.png')`,
            textOverflow: "ellipsis",
          }}
        >
          <Notification color="white" size="100px" />
          <Heading size="medium" margin={{ top: "50px", bottom: "10px" }}>
            Our Mission
          </Heading>
          <Heading
            color="#999999"
            textAlign="center"
            alignSelf="center"
            size="small"
            margin="none"
          >
            Providing Accurate Navigation in Campuses,
          </Heading>
          <Heading
            color="#999999"
            textAlign="center"
            alignSelf="center"
            size="small"
            margin="none"
          >
            but also Bringing Together Communities
          </Heading>
        </Box>
      </Box>
      <CardGrid cards={AboutCards} />

      {/* <Box
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
            <Help size="45px" color="red" />
            <Heading size="40px">Who We Are</Heading>
          </CardHeader>
          <CardBody margin={{ left: "50px", right: "50px", bottom: "50px" }}>
            <Heading textAlign="center" size="20px">
              Carto-Campus is an interactive application that provides students
              and teachers a platform to navigate from class to class without
              any difficulties. With schools getting larger and larger,
              traversing through school campuses has become harder than ever
              before. Our goal is to develop technologies and applications for
              various platforms to provide easy and accesible navigation to
              students and other visitors.
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
            <Group size="45px" color="red" />
            <Heading size="40px">Involvement</Heading>
          </CardHeader>
          <CardBody margin={{ left: "50px", right: "50px", bottom: "50px" }}>
            <Heading textAlign="center" size="20px">
              Through our project students will be able to find the most optimal
              navigation from place to place on campus. Additionally, our
              project will help students find clubs and other extracurricular
              activities. Moreover, we hope to expand our project, and along
              with that, our team as well. Students may join our programming
              team and help us build our technology, giving students valuable
              experience in a growing field.
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
            <Target size="45px" color="red" />
            <Heading size="40px">Vision</Heading>
          </CardHeader>
          <CardBody margin={{ left: "50px", right: "50px", bottom: "50px" }}>
            <Heading alignSelf="center" textAlign="center" size="20px">
              With Carto-Campus, we hope to create a community where students
              are able to navigate their schools with ease, and hopefully
              develop their interests through the discovery of clubs and other
              extracurricular activities. Additionally, we would like to include
              many students in our project to provide them with experience in
              programming and cartography, inspiring them to create projects of
              their own.
            </Heading>
          </CardBody>
        </Card>
      </Box> */}
      <CartoFooter />
    </div>
  );
}
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(About);
