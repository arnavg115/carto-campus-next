import { Box } from "grommet";
import { colors } from "../lib/Constants";
import { FC } from "react";

export const AuthBox: FC = ({ children }) => {
  return (
    <Box
      fill={true}
      justify="center"
      align="center"
      style={{ height: "100vh" }}
      background="black"
    >
      <Box
        direction="column"
        pad="small"
        align="center"
        justify="center"
        width="400px"
        height="400px"
        gap="small"
        border={{ color: colors.basic.five, size: "medium" }}
        style={{ borderRadius: "10px" }}
      >
        {children}
      </Box>
    </Box>
  );
};
