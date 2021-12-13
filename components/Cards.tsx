import {
  Box,
  Card,
  CardBody,
  CardHeader,
  Heading,
  ResponsiveContext,
} from "grommet";
import { FC, useContext } from "react";
import styles from "../styles/Home.module.css";
export interface CardsProps {
  title: string;
  icon: JSX.Element;
  description: string;
}

const Cards: FC<CardsProps> = (props) => {
  const size = useContext(ResponsiveContext);
  return (
    <div>
      <Card
        background="light-1"
        align="center"
        alignContent="center"
        round="large"
        className={styles.card}
      >
        <CardHeader margin={{ top: "30px" }}>
          <Box
            align="center"
            direction={size === "small" ? "column" : "row"}
            gap={size !== "small" ? "small" : "none"}
          >
            {props.icon}
            <Heading size="40px">{props.title}</Heading>
          </Box>
        </CardHeader>
        <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
          <Heading textAlign="center" size="20px">
            {props.description}
          </Heading>
        </CardBody>
      </Card>
    </div>
  );
};

export default Cards;
