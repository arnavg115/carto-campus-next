import { Box, Heading, Image } from "grommet";
import { FC } from "react";
import {
  FormLock,
  Deploy,
  Trigger,
  Accessibility,
  Location,
  Organization,
} from "grommet-icons";

export interface CarouselItemProps {
  src: string;
  text: string;
  icon: JSX.Element;
  title: string;
  left: boolean;
}

const CarouselItem: FC<CarouselItemProps> = (props) => {
  console.log(props.src);
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat( auto-fit, minmax(250px,1fr) )",
        paddingLeft: "10px",
        paddingRight: "10px",
        height: "100%",
        gap: "20px",
        placeItems: "center",
      }}
    >
      <Box direction="row" align="center" height="100%" width="100%">
        <Image src={props.src} fit="cover" />
      </Box>
      <Box alignContent="center">
        <Box align="center">
          {props.icon}
          <Heading size="small" alignSelf="center" textAlign="center">
            {props.title}
          </Heading>
        </Box>
        <Heading color="gray" size="25px" alignSelf="center" textAlign="center">
          {props.text}
        </Heading>
      </Box>
    </div>
  );
};

export default CarouselItem;
