import { Box, Spinner } from "grommet";
import React from "react";

const CartoLoader = () => {
  return (
    <Box
      align="center"
      justify="center"
      height="100vh"
      width="100vw"
      background="black"
    >
      <Spinner color="red" />
    </Box>
  );
};

export default CartoLoader;
