import { Box, Button, Tip } from "grommet";
import { NextRouter, useRouter } from "next/router";
import React, { FC } from "react";

export interface SideBarTipProps {
  content: string;
  icon: JSX.Element;
  callback: (router: NextRouter) => void;
}

export const SideBarTip: FC<SideBarTipProps> = ({
  content,
  icon,
  callback,
}) => {
  const router = useRouter();
  return (
    <Tip
      content={
        <Box
          background="black"
          pad="small"
          margin={{ left: "40px" }}
          round="small"
        >
          {content}
        </Box>
      }
      dropProps={{ align: { left: "right" } }}
      plain
    >
      <Button
        icon={icon}
        onClick={() => callback(router)}
        hoverIndicator
        style={{ borderRadius: "10px" }}
      />
    </Tip>
  );
};
