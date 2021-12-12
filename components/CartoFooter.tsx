import { Anchor, Box, Grommet, Image, Text, Footer } from "grommet";

import {
  FacebookOption,
  Instagram,
  Twitter,
  MailOption as Mail,
} from "grommet-icons";

const Media = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <style>{`
            .icons {
                transition: all 0.2s ease-in-out;
            }
            .icons:hover{
                transform: scale(1.3);
            }
        `}</style>
    <Anchor
      className="icons"
      a11yTitle="Email Us"
      href="mailto: contact.cartocampus@gmail.com"
      target="_blank"
      icon={<Mail color="white" />}
    />
    <Anchor
      className="icons"
      a11yTitle="Follow us on Instagram"
      href="https://www.instagram.com/carto.campus/"
      target="_blank"
      icon={<Instagram color="white" />}
    />
    <Anchor
      className="icons"
      a11yTitle="Check us out on Facebook"
      href="https://www.facebook.com/profile.php?id=100075486109297"
      target="_blank"
      icon={<FacebookOption color="white" />}
    />
    <Anchor
      className="icons"
      a11yTitle="Follow us on Twitter"
      href="https://twitter.com/CartoCampus"
      target="_blank"
      icon={<Twitter color="white" />}
    />
  </Box>
);

function CartoFooter() {
  return (
    <Grommet>
      <Footer background="black" pad="small">
        <Box align="center" direction="row" gap="xsmall">
          <Image
            fit="cover"
            src="./carto-campus-dark.png"
            width="50px"
            height="50px"
          />
          <Text alignSelf="center" color="white" size="small">
            Carto-Campus
          </Text>
        </Box>
        <Media />
        <Text textAlign="center" size="xsmall">
          ©Copyright Carto 2021
        </Text>
      </Footer>
    </Grommet>
  );
}

export default CartoFooter;
