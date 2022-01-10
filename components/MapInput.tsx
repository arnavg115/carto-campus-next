import styles from "../styles/Dashboard.module.css";
import React, { FC, useState } from "react";
import { Button, TextInput } from "grommet";
import { Refresh, Launch, Save, History } from "grommet-icons";
import { RoomType } from "../lib/clientTypes";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { search } from "../lib/clientUtils";
import firebase from "firebase";
import { AuthUserContext } from "next-firebase-auth";
import { useSelector } from "react-redux";
import { State } from "../lib/redux";
import DashModal from "./DashModal";
interface MapInputProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  initSuggestion: RoomType[];
  nav: (origin: string, dest: string, reset: (fly: boolean) => void) => void;
  resetDashboard: () => void;
  navOn: boolean;
  auth: AuthUserContext;
  distance: number;
  metric: boolean;
  cent: number[];
}

const MapInput: FC<MapInputProps> = ({
  initSuggestion,
  map,
  nav,
  navOn,
  resetDashboard,
  auth,
  metric,
  distance,
  cent,
}) => {
  const state = useSelector<State, State>((state) => state);
  const [saved, setSaved] = useState<any[]>([]);
  const [ModalOpen, setModalOpen] = useState(false);
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
        center: cent as LngLatLike,
        zoom: 16.5,
      });

      setOrigin("");
      setDest("");
      setDestS([]);
      setORS([]);
    }
  };
  const fetchSaved = async () => {
    const docs = await firebase
      .firestore()
      .collection("users")
      .doc(auth.id!)
      .collection("routes")
      .where("school", "==", state.school)
      .get();
    const data = docs.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    console.log(data);
    setSaved(docs.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  return (
    <div className={styles.inptbox}>
      <DashModal
        metric={metric}
        saved={saved}
        setSaved={setSaved}
        fetchSaved={fetchSaved}
        setModalOpen={setModalOpen}
        ModalOpen={ModalOpen}
        Auth={auth}
        navigate={(or, dest) => {
          nav(or, dest, reset);
          setOrigin(or);
          setDest(dest);
          setModalOpen(false);
        }}
      />
      <TextInput
        style={{ backgroundColor: "white" }}
        placeholder="Starting Point"
        onChange={async (e) => {
          setOrigin(e.target.value);
          const suggestions = await search(state.school, e.target.value);
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
          const suggestions = await search(state.school, e.target.value);
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
          onClick={() => {
            fetchSaved();
            setModalOpen(true);
          }}
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
          const data = await doc
            .where("origin", "==", origin)
            .where("dest", "==", dest)
            .get();
          if (!data.empty) {
            alert("Route already saved");
            return;
          }
          await doc.add({
            origin: origin,
            dest: dest,
            time: Date.now(),
            school: state.school,
            distance: distance,
          });
          alert("Route saved!");
        }}
      />
    </div>
  );
};

export default MapInput;
