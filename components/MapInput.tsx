import styles from "../styles/Dashboard.module.css";

import React, { FC, useEffect, useState } from "react";
import { Button, TextInput } from "grommet";
import { Refresh, Launch } from "grommet-icons";
import { useField } from "../lib/hooks";
import { RoomType } from "../lib/barrel";
interface MapInputProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  initSuggestion: RoomType[];
}

const MapInput: FC<MapInputProps> = ({ initSuggestion }) => {
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [orS, setORS] = useState<RoomType[]>(initSuggestion);
  const [destS, setDestS] = useState<RoomType[]>(initSuggestion);

  return (
    <div className={styles.inptbox}>
      <TextInput
        style={{ backgroundColor: "white" }}
        placeholder="Starting Point"
        onChange={(e) => setOrigin(e.target.value)}
        value={origin}
        suggestions={orS.map((s) => s.name)}
        onSelect={(s) => {
          setOrigin(s.suggestion);
        }}
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
        onChange={(e) => setDest(e.target.value)}
        suggestions={destS.map((s) => s.name)}
        onSelect={(e) => {
          setDest(e.suggestion);
        }}
        value={dest}
      />
      <Button icon={<Launch />} primary color={"black"} />
    </div>
  );
};

export default MapInput;
