import React, { useEffect, useRef, useState } from "react";
import { FormDown } from "grommet-icons";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { CartoPage } from "../components/CartoPage";
import { NonMapPage } from "../components/NonMapPage";
import { NextPage } from "next";
import MapInput from "../components/MapInput";
import { RoomType } from "../lib/barrel";
import { server } from "../lib/config";
import { useRouter } from "next/router";
import { Button, Collapsible } from "grommet";
import { get, getRoute, midpoint } from "../lib/clientUtils";

// @ts-ignore
const DashboardPage: NextPage = ({ init }) => {
  const Auth = useAuthUser();
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!;
  const [dir, setDir] = useState<any>(null);
  const [open, setOpen] = useState(false);
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const router = useRouter();
  const resetParent = () => {
    setDir(null);
  };
  useEffect(() => {
    if (!Auth.emailVerified) {
      router.push("/verify");
    }
    initState();
  }, []);
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
  async function initState() {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current!,
      style: "mapbox://styles/garnavaurha/ckvhltoso6l3m14qq44abl01u",
      center: [-121.917294, 37.672366],
      zoom: 16.5,
      minZoom: 16,
    });
  }

  return (
    <CartoPage auth={Auth} landing={false}>
      <MapInput
        map={map}
        initSuggestion={init}
        nav={nav}
        resetDashboard={resetParent}
      />
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }}></div>
      {dir ? (
        <div
          style={{
            width: "250px",
            backgroundColor: "white",
            position: "absolute",
            zIndex: 2,
            right: 0,
            bottom: 0,
            marginBottom: "30px",
            marginRight: "10px",
            borderRadius: "10px",
            maxHeight: "300px",
            overflowY: "auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 0.5fr",
              padding: "10px",
            }}
          >
            <p style={{ margin: "0px" }}>
              {Math.floor(dir.duration / 60)} min{" "}
              {Math.floor(dir.duration % 60)} s
            </p>
            <p style={{ margin: "0px" }}>
              ETA:{" "}
              {(() => {
                const e = new Date(Date.now() + dir.duration * 1000);
                // console.log(e);
                const str = e.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                });
                if (str.substring(0, 1) === "0") {
                  return str.substring(1);
                }
                return str;
              })()}
            </p>
            <Button icon={<FormDown />} onClick={() => setOpen(!open)} />
          </div>
          <Collapsible
            open={open}
            style={{
              padding: "10px",
            }}
          >
            {dir.legs[0].steps.map((x: any) => {
              return <p>{x.maneuver.instruction}</p>;
            })}
          </Collapsible>
        </div>
      ) : null}
    </CartoPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
    if (!AuthUser.emailVerified) {
      return {
        props: {
          init: [],
        },
      };
    }
    const token = await AuthUser.getIdToken();
    if (!token) return { props: { init: [] } };
    const response = await fetch(
      `${server}/api/init?id=61a83693444ddc3829a46f3a`,
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    );
    // console.log(response.status);
    const data = (await response.json()).data as RoomType[];
    return {
      props: {
        init: data,
      },
    };
  }
);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(DashboardPage);
