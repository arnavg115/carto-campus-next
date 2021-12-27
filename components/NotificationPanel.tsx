import { Button, Box, Header, Heading, ResponsiveContext } from "grommet";
import { Notification } from "grommet-icons";
import { FC, useContext, useEffect, useState } from "react";
import { Close } from "grommet-icons";
import Cookies from "js-cookie";

interface NotificationPanelProps {
  openPanel: boolean;
}

const NotificationPanel: FC<NotificationPanelProps> = ({ openPanel }) => {
  const [open, setOpen] = useState(openPanel);

  if (!open) {
    return null;
  }
  return (
    <Header
      direction="column"
      background="#333333"
      pad="5px"
      align="center"
      alignContent="center"
    >
      <Box
        direction="row"
        gap="small"
        align="center"
        alignContent="center"
        alignSelf="center"
      >
        <Notification size="25px" color="white" />
        <Heading size="20px" color="white" alignSelf="center">
          Carto-Campus is in Public Beta. Please email us with any bugs or
          problems you find.{" "}
        </Heading>
        <Button
          primary
          color="red"
          label="Email Us"
          href="mailto:contact.cartocampus@gmail.com"
        />
        <Button
          color="brand"
          icon={<Close />}
          onClick={() => {
            setOpen(false);
            Cookies.set("open", "false");
          }}
        />
      </Box>
    </Header>
  );
};

export default NotificationPanel;
