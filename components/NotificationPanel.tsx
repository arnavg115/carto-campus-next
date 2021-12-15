import { Button, Box, Header, Heading, ResponsiveContext } from "grommet";
import { Notification } from "grommet-icons";
import { useContext, useEffect, useState } from "react";
import { Close } from "grommet-icons";

function NotificationPanel() {
  const size = useContext(ResponsiveContext);
  const [open, setOpen] = useState(true);
  useEffect(() => {
    const open = localStorage.getItem("open");
    setOpen(open !== "false");
  }, []);
  if (size === "small") {
    if (open) {
      alert(
        "Carto-Campus is in public beta. Please email us with any bugs or problems you find at contact.cartocampus@gmail.com"
      );
      localStorage.setItem("open", "false");
    }
    return null;
  }
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
            localStorage.setItem("open", "false");
          }}
        />
      </Box>
    </Header>
  );
}

export default NotificationPanel;
