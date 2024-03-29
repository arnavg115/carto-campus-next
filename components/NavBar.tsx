import {
  Button,
  Anchor,
  Box,
  Header,
  Nav,
  Image,
  ResponsiveContext,
  Collapsible,
} from "grommet";
import Link from "next/link";
import { useRouter } from "next/router";
import { FC, useContext, useState } from "react";
import { FormDown } from "grommet-icons";
import Divider from "./Divider";
import { AuthUserContext } from "next-firebase-auth";

interface NavBarProps {
  authenticated: boolean;
  auth: AuthUserContext;
}

const Navbar: FC<NavBarProps> = ({ authenticated, auth }) => {
  const [open, setOpen] = useState(false);
  const size = useContext(ResponsiveContext);
  if (size === "small") {
    return (
      <div>
        <Header background="black" pad="medium" align="center">
          <Box direction="row" gap="small" align="center">
            <Image
              fit="cover"
              src="./carto-campus-dark.png"
              width="50px"
              height="50px"
            />
            <Anchor size="medium" href="/" color="white" label="Carto-Campus" />
          </Box>
          <Button
            icon={<FormDown />}
            onClick={() => setOpen(!open)}
            style={{
              transform: !open ? "rotate(0deg)" : "rotate(180deg)",
              transition: "all 0.2s ease-in-out",
            }}
          />
        </Header>
        <div style={{ backgroundColor: "black" }}>
          <Collapsible open={open}>
            <Box
              background="black"
              align="center"
              justify="center"
              gap="small"
              pad={{ top: "medium", bottom: "medium" }}
              border={{ side: "bottom", color: "dark-1" }}
            >
              <Anchor size="medium" href="/" color="white" label="Home" />
              <Divider />
              <Anchor size="medium" href="/about" color="white" label="About" />
              <Divider />

              {!authenticated ? (
                <Box direction="row" gap="medium">
                  <Button
                    secondary
                    color="red"
                    href="/register"
                    label="Sign Up"
                  />
                  <Button primary color="red" href="/login" label="Log In" />
                </Box>
              ) : (
                <Box direction="row" gap="medium">
                  <Button
                    secondary
                    color="red"
                    href="/login"
                    label="Sign Out"
                  />
                  <Button
                    primary
                    color="red"
                    href="/dashboard"
                    label="Dashboard"
                  />
                </Box>
              )}
            </Box>
          </Collapsible>
        </div>
      </div>
    );
  }
  return (
    <Header background="black" pad="medium" align="center">
      <Box direction="row" gap="small" align="center">
        <Image
          fit="cover"
          src="./carto-campus-dark.png"
          width="50px"
          height="50px"
        />
        <Anchor size="x-large" href="/" color="white" label="Carto-Campus" />
      </Box>

      <Nav margin={{ right: "50px" }} direction="row">
        <Anchor color="white" href="/" label="Home" />
        <Anchor color="white" href="/about" label="About" />
      </Nav>
      {!authenticated ? (
        <Nav direction="row" align="center">
          <Button secondary color="red" href="/register" label="Sign Up" />
          <Button primary color="red" href="/login" label="Log In" />
        </Nav>
      ) : (
        <Nav direction="row" align="center">
          <Button
            secondary
            color="red"
            onClick={async () => {
              await auth.signOut();
            }}
            label="Log Out"
          />
          <Button primary color="red" href="/dashboard" label="Dashboard" />
        </Nav>
      )}
    </Header>
  );
};

export default Navbar;
