import React, { useEffect, useRef } from "react";
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
import { Button } from "grommet";

// @ts-ignore
const DashboardPage: NextPage = ({ init }) => {
  const Auth = useAuthUser();
  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX!;

  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<null | mapboxgl.Map>(null);
  const router = useRouter();
  useEffect(() => {
    if (!Auth.emailVerified) {
      router.push("/verify");
    }
    initState();
  }, []);
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
      <MapInput map={map} initSuggestion={init} />
      <div ref={mapContainer} style={{ height: "100%", width: "100%" }}></div>
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
