import { Button, Box, Header, Heading } from "grommet";
import { Notification } from "grommet-icons";

function NotificationPanel() {
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
      </Box>
    </Header>
  );
}

export default NotificationPanel;
