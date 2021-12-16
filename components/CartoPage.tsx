import { Box } from "grommet";
import { AuthUserContext } from "next-firebase-auth";
import React, { FC } from "react";
import CartoFooter from "./CartoFooter";
import HeadComponent from "./Head";
import Navbar from "./NavBar";
import NotificationPanel from "./NotificationPanel";
import SideBar from "./SideBar";

interface CartoPageProps {
  auth: AuthUserContext;
  landing: boolean;
}

export const CartoPage: FC<CartoPageProps> = ({ children, auth, landing }) => {
  if (landing) {
    return (
      <div>
        <NotificationPanel />
        <Navbar authenticated={!!auth.email} />
        {children}
        <CartoFooter />
      </div>
    );
  }
  return (
    <Box direction="row" height="100vh">
      <HeadComponent />
      <SideBar auth={auth} />
      {children}
    </Box>
  );
};
