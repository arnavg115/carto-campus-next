import styles from "../styles/Dashboard.module.css";

import React, { FC } from "react";
import { Button, TextInput } from "grommet";
import { Refresh, Launch } from "grommet-icons";
interface MapInputProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
}

const MapInput: FC<MapInputProps> = () => {
  return (
    <div className={styles.inptbox}>
      <TextInput
        style={{ backgroundColor: "white" }}
        placeholder="Starting Point"
        onSelect={(e) => {}}
      />

      <Button
        icon={<Refresh color="#ffffff" />}
        primary
        color={"red"}
        onClick={() => {}}
      />
      <TextInput
        style={{ backgroundColor: "white" }}
        placeholder="Destination"
        onChange={async (e) => {}}
        onSelect={(e) => {}}
      />
      <Button icon={<Launch />} primary color={"black"} />
    </div>
  );
};

export default MapInput;
