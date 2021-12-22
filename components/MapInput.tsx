import styles from "../styles/Dashboard.module.css";

import React, { FC, useState } from "react";
import { Button, TextInput } from "grommet";
import { Refresh, Launch } from "grommet-icons";

import { RoomType } from "../lib/barrel";
import { get, getRoute, midpoint, search } from "../lib/clientUtils";
import mapboxgl from "mapbox-gl";
interface MapInputProps {
  map: React.MutableRefObject<mapboxgl.Map | null>;
  initSuggestion: RoomType[];
}

const MapInput: FC<MapInputProps> = ({ initSuggestion, map }) => {
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
  const nav = async () => {
    reset(false);
    if (origin === "" || dest === "") {
      alert("Please enter origin and destination");
      return;
    }
    const or = await get("61a83693444ddc3829a46f3a", origin);
    const dst = await get("61a83693444ddc3829a46f3a", dest);
    map.current!.addLayer({
      id: "start",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: or.coord,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "red",
      },
    });
    map.current!.addLayer({
      id: "end",
      type: "circle",
      source: {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [
            {
              type: "Feature",
              properties: {},
              geometry: {
                type: "Point",
                coordinates: dst.coord,
              },
            },
          ],
        },
      },
      paint: {
        "circle-radius": 10,
        "circle-color": "black",
      },
    });

    // console.log(or);

    const res = await getRoute(or.coord, dst.coord);
    const route = res.geometry.coordinates;

    const geojsn: any = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    map.current!.flyTo({
      center: midpoint(or.coord, dst.coord),
      zoom: 18,
    });
    // console.log(res);
    map.current!.addLayer({
      id: "route",
      type: "line",
      source: {
        type: "geojson",
        data: geojsn,
      },
      layout: {
        "line-join": "round",
        "line-cap": "round",
      },
      paint: {
        "line-color": "#3887be",
        "line-width": 5,
        "line-opacity": 0.75,
      },
    });
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
      <Button icon={<Launch />} primary color={"black"} onClick={() => nav()} />
    </div>
  );
};

export default MapInput;
