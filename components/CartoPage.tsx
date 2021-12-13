import { Box } from "grommet";
import { AuthUserContext } from "next-firebase-auth";
import React, { FC } from "react";
import SideBar from "./SideBar";

interface CartoPageProps {
  auth: AuthUserContext;
}

export const CartoPage: FC<CartoPageProps> = ({ children, auth }) => (
  <Box direction="row" height="100vh">
    <SideBar auth={auth} />
    {children}
  </Box>
);
