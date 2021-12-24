import { Box, Button, Heading } from "grommet";
import React from "react";

const SplashBox = () => {
  return (
    <div>
      <Box background="black">
        <Heading
          margin={{ top: "100px", bottom: "none" }}
          alignSelf="center"
          textAlign="center"
          color="white"
        >
          Accurate Navigation for
        </Heading>
        <Heading
          alignSelf="center"
          textAlign="center"
          margin={{ top: "5px", bottom: "10px" }}
        >
          Students and Visitors
        </Heading>
        <Heading
          size="small"
          margin={{ top: "none", bottom: "50px" }}
          alignSelf="center"
          textAlign="center"
          color="gray"
        >
          Going the Extra Mile
        </Heading>
        <Button
          href="/dashboard"
          margin={{ bottom: "100px" }}
          primary
          alignSelf="center"
          label="Start Navigating For Free"
          color="brand"
        />
      </Box>
    </div>
  );
};

export default SplashBox;
