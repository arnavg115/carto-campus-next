import mapboxgl from "mapbox-gl";
import { AuthUserContext } from "next-firebase-auth";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Prefs, RoomType, school } from "../lib/clientTypes";
import { get, getRoute, midpoint } from "../lib/clientUtils";
import { State } from "../lib/redux";
import DirBox from "./DirBox";
import MapInput from "./MapInput";
import SchoolPicker from "./SchoolPicker";

interface MapProps {
  init: RoomType[];
  school: school;
  schools: school[];
  prefs: Prefs;
  Auth: AuthUserContext;
}

const Map: FC<MapProps> = ({ init, school, schools, prefs, Auth }) => {
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const [dir, setDir] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const state = useSelector((state: State) => state);
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!;
  useEffect(() => {
    initState();
  }, []);
  async function initState() {
    console.log("initState");
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/garnavaurha/ckvhltoso6l3m14qq44abl01u",
      center: [-121.917294, 37.672366],
      zoom: 16.5,
      minZoom: 16,
    });
    // fetchSaved();
  }
  const resetParent = () => {
    setDir(null);
  };
  const nav = async (
    origin: string,
    dest: string,
    reset: (fly: boolean) => void
  ) => {
    reset(false);
    setOpen(false);
    if (origin === "" || dest === "") {
      alert("Please enter origin and destination");
      return;
    }
    const or = await get(state.school, origin);
    const dst = await get(state.school, dest);
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

    const res = await getRoute(or.coord, dst.coord);
    setDir(res);

    const route = res.geometry.coordinates;

    const geojsn: any = {
      type: "Feature",
      properties: {},
      geometry: {
        type: "LineString",
        coordinates: route,
      },
    };
    const zoom =
      res.distance > 270
        ? -0.007 * (res.distance - 270) + 16.75
        : -0.003 * (res.distance - 270) + 18;
    console.log(zoom);

    map.current!.flyTo({
      center: midpoint(or.coord, dst.coord),
      zoom: zoom,
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
    <div style={{ height: "100%", width: "100%" }}>
      <MapInput
        metric={prefs.units === "metric"}
        distance={dir ? dir.distance : 0}
        auth={Auth}
        map={map}
        initSuggestion={init}
        nav={nav}
        resetDashboard={resetParent}
        navOn={!!dir}
      />
      <SchoolPicker initSchool={school} schools={schools} />
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }}></div>
      {dir ? (
        <DirBox
          dir={dir}
          prefs={prefs}
          open={open}
          setOpen={(open) => setOpen(open)}
        />
      ) : null}
    </div>
  );
};

export default Map;
