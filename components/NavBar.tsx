import { Button, Anchor, Box, Header, Nav, Image } from "grommet";
import { FC } from "react";

interface NavBarProps {
  authenticated: boolean;
}

const Navbar: FC<NavBarProps> = ({ authenticated }) => {
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
        <Nav>
          <Button primary color="red" href="/dashboard" label="Dashboard" />
        </Nav>
      )}
    </Header>
  );
};

export default Navbar;
