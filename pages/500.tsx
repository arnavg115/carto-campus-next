import { Box, Button } from "grommet";
import React from "react";

const FiveHundred = () => {
  return (
    <Box background="black" align="center" justify="center" height="100vh">
      <h1 style={{ color: "red" }}>401</h1>
      <h3>Uh Oh! Looks like you are not Authorized for this page.</h3>
      <Button label="Go Home" href="/" primary color="brand" />
    </Box>
  );
};

export default FiveHundred;
