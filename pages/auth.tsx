import { Box, ResponsiveContext, Tab, Tabs } from "grommet";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useContext } from "react";
import Navbar from "../components/NavBar";

const Auth = () => {
  const size = useContext(ResponsiveContext);
  return (
    <Box height="100vh" width="100vw" background="dark-1">
      <Navbar authenticated={false} />

      <Box width="100%" height="100%" align="center" justify="center">
        <Tabs>
          <Tab title="Login">
            <Box
              width={size !== "small" ? "400px" : "80vw"}
              height={size !== "small" ? "400px" : "50vh"}
              align="center"
              border={{ side: "all", color: "light-3", size: "medium" }}
              round="small"
            ></Box>
          </Tab>
          <Tab title="Rgister">
            <Box
              width={size !== "small" ? "400px" : "80vw"}
              height={size !== "small" ? "400px" : "50vh"}
              align="center"
              border={{ side: "all", color: "light-3", size: "medium" }}
              round="small"
            ></Box>
          </Tab>
        </Tabs>
      </Box>
    </Box>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Auth);
