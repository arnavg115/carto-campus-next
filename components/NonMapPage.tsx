import { Box } from "grommet";
import React, { FC } from "react";
import { NonMapHeaderProps } from "../lib/types";
import { CartoPage } from "./CartoPage";

export const NonMapPage: FC<NonMapHeaderProps> = ({
  title,
  children,
  auth,
}) => {
  return (
    <CartoPage auth={auth} landing={false} open={false}>
      <Box width="100%" height="100%" background="#282828" align="center">
        <Box width="50%">
          <h1>{title}</h1>
          <Box
            height="2.5px"
            width="100%"
            style={{ backgroundColor: "grey" }}
          ></Box>
          {children}
        </Box>
      </Box>
    </CartoPage>
  );
};
