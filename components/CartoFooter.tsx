import { Box, Image, Text, Footer, ResponsiveContext } from "grommet";

import { useContext } from "react";
import Media from "./Media";

function CartoFooter() {
  const size = useContext(ResponsiveContext);
  return (
    <Footer background="black" pad="small">
      <Box align="center" direction="row" gap="xsmall">
        <Image
          fit="cover"
          src="./carto-campus-dark.png"
          width="50px"
          height="50px"
        />
        {size !== "small" ? (
          <Text alignSelf="center" color="white" size="small">
            Carto-Campus
          </Text>
        ) : null}
      </Box>
      <Media />
      <Text textAlign="center" size="xsmall">
        ©Copyright Carto 2022
      </Text>
    </Footer>
  );
}

export default CartoFooter;
