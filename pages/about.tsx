import Navbar from "../components/NavBar";
import CartoFooter from "../components/CartoFooter";
import { Box, Heading } from "grommet";

import { Notification, Help } from "grommet-icons";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import CardGrid from "../components/CardGrid";
import { AboutCards } from "../lib/contents";
import NotificationPanel from "../components/NotificationPanel";
import { CartoPage } from "../components/CartoPage";

function About() {
  const Auth = useAuthUser();
  return (
    <CartoPage auth={Auth} landing>
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
    </CartoPage>
  );
}
export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(About);
