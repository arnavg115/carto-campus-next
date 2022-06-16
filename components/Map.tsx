import { gql } from "@apollo/client";
import mapboxgl, { LngLatLike } from "mapbox-gl";
import { AuthUserContext } from "next-firebase-auth";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { initializeApollo } from "../lib/apollo";
import { Prefs, RoomType, school } from "../lib/clientTypes";
import {
  addDot,
  addLine,
  get,
  getBrWf,
  getRoute,
  midpoint,
} from "../lib/clientUtils";
import { State } from "../lib/redux";
import DirBox from "./DirBox";
import MapInput from "./MapInput";
import SchoolPicker from "./SchoolPicker";
import { toast } from "react-toastify";

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
  const [cent, setCent] = useState(school.coord);
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!;
  useEffect(() => {
    initState();
  }, []);
  useEffect(() => {
    handleSchoolChange();
  }, [state]);
  async function handleSchoolChange() {
    const query = gql`
      query ($getSchoolId: String!) {
        getSchool(id: $getSchoolId) {
          coord
        }
      }
    `;
    const client = initializeApollo();
    const { data } = await client.query({
      query,
      variables: {
        getSchoolId: state.school,
      },
    });

    setCent(data.getSchool.coord);
    map.current?.panTo(data.getSchool.coord);
  }
  async function initState() {
    console.log("initState");
    // if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/garnavaurha/ckvhltoso6l3m14qq44abl01u",
      center: school.coord as LngLatLike,
      zoom: 16.5,
      minZoom: 16,
    });
    // map.current.addControl(new MapboxPrintControl(), "bottom-left");
    // fetchSaved();
  }
  const resetParent = () => {
    setDir(null);
  };

  const navTo = async (dest: number[], or: number[], mapinpt: mapboxgl.Map) => {
    addDot(mapinpt, dest, "black", "end");
    addDot(mapinpt, or, "red", "start");
    const res = await getRoute(or, dest);
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
    // console.log(zoom);

    mapinpt.flyTo({
      center: midpoint(or, dest),
      zoom: zoom,
    });
    addLine(mapinpt, geojsn);
  };
  const navBRWF = async (loc: GeolocationPosition, t: "br" | "wf") => {
    const res = await getBrWf(loc, state.school, t);
    navTo(res.coord, [loc.coords.longitude, loc.coords.latitude], map.current!);
  };
  const nav = async (
    origin: string,
    dest: string,
    reset: (fly: boolean) => void
  ) => {
    reset(false);
    setOpen(false);
    if (origin === "" || dest === "") {
      toast.error("Please enter origin and destination", {
        theme: "dark",
      });
      throw new Error("");
      return;
    }
    const or = await get(state.school, origin);
    const dst = await get(state.school, dest);
    navTo(dst.coord, or.coord, map.current!);
    return { ori: or.name, dsti: dst.name };
  };
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <MapInput
        metric={!!prefs.units ? prefs.units === "metric" : true}
        distance={dir ? dir.distance : 0}
        auth={Auth}
        map={map}
        initSuggestion={init}
        nav={nav}
        resetDashboard={resetParent}
        navOn={!!dir}
        cent={cent}
        navBRWF={navBRWF}
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
