import { Anchor, Box } from "grommet";
import React from "react";
import { Mail, Instagram, FacebookOption, Twitter } from "grommet-icons";
import styles from "../styles/Home.module.css";

const Media = () => {
  return (
    <Box direction="row" gap="xxsmall" justify="center">
      <Anchor
        className={styles.icons}
        a11yTitle="Email Us"
        href="mailto: contact.cartocampus@gmail.com"
        target="_blank"
        icon={<Mail color="white" />}
      />
      <Anchor
        className={styles.icons}
        a11yTitle="Follow us on Instagram"
        href="https://www.instagram.com/carto.campus/"
        target="_blank"
        icon={<Instagram color="white" />}
      />
      <Anchor
        className={styles.icons}
        a11yTitle="Check us out on Facebook"
        href="https://www.facebook.com/profile.php?id=100075486109297"
        target="_blank"
        icon={<FacebookOption color="white" />}
      />
      <Anchor
        className={styles.icons}
        a11yTitle="Follow us on Twitter"
        href="https://twitter.com/CartoCampus"
        target="_blank"
        icon={<Twitter color="white" />}
      />
    </Box>
  );
};

export default Media;
