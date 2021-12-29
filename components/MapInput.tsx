import styles from "../styles/Dashboard.module.css";

import React, { FC, useState } from "react";
import { Button, TextInput } from "grommet";
import { Refresh, Launch, Save, History } from "grommet-icons";

import { RoomType } from "../lib/clientTypes";

import mapboxgl from "mapbox-gl";
import { search } from "../lib/clientUtils";
import firebase from "firebase";
import { AuthUserContext } from "next-firebase-auth";
import { useSelector } from "react-redux";
import { State } from "../lib/redux";
interface MapInputProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  initSuggestion: RoomType[];
  nav: (origin: string, dest: string, reset: (fly: boolean) => void) => void;
  resetDashboard: () => void;
  navOn: boolean;
  auth: AuthUserContext;
  fromHistory: () => void;
}

const MapInput: FC<MapInputProps> = ({
  initSuggestion,
  map,
  nav,
  navOn,
  resetDashboard,
  auth,
  fromHistory,
}) => {
  const state = useSelector<State, State>((state) => state);
  const [origin, setOrigin] = useState("");
  const [dest, setDest] = useState("");
  const [orS, setORS] = useState<RoomType[]>(initSuggestion);

  const [destS, setDestS] = useState<RoomType[]>(initSuggestion);
  const removeLayer = (name: string) => {
    if (map.current!.getLayer(name)) {
      map.current!.removeLayer(name);
      map.current!.removeSource(name);
    }
  };
  const reset = (fly: boolean) => {
    removeLayer("route");
    removeLayer("start");
    removeLayer("end");
    resetDashboard();
    if (fly) {
      map.current!.flyTo({
        center: [-121.917294, 37.672366],
        zoom: 16.5,
      });

      setOrigin("");
      setDest("");
      setDestS([]);
      setORS([]);
    }
  };

  return (
    <div className={styles.inptbox}>
      <TextInput
        style={{ backgroundColor: "white" }}
        placeholder="Starting Point"
        onChange={async (e) => {
          setOrigin(e.target.value);
          const suggestions = await search(
            "61a83693444ddc3829a46f3a",
            e.target.value
          );
          setORS(suggestions);
        }}
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
        onClick={() => reset(true)}
      />
      <TextInput
        style={{ backgroundColor: "white" }}
        placeholder="Destination"
        onChange={async (e) => {
          setDest(e.target.value);
          const suggestions = await search(
            "61a83693444ddc3829a46f3a",
            e.target.value
          );
          setDestS(suggestions);
        }}
        suggestions={destS.map((s) => s.name)}
        onSelect={(e) => {
          setDest(e.suggestion);
        }}
        value={dest}
      />
      <Button
        icon={<Launch />}
        primary
        color={"black"}
        onClick={() => nav(origin, dest, reset)}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "row-reverse",
        }}
      >
        <Button
          primary
          icon={<History color="white" />}
          style={{ width: "48px" }}
          onClick={fromHistory}
        />
      </div>
      <Button
        icon={<Save />}
        primary
        color={"white"}
        disabled={!navOn}
        onClick={async () => {
          const doc = firebase
            .firestore()
            .collection("users")
            .doc(auth.id!)
            .collection("routes");
          await doc.add({
            origin: origin,
            dest: dest,
            time: Date.now(),
            school: state.school,
          });
          alert("Route saved!");
        }}
      />
    </div>
  );
};

export default MapInput;
