// @ts-ignore
import MapboxDirections from "@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions";
import React, { useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { CartoPage } from "../components/CartoPage";
import { NextPage } from "next";
import MapInput from "../components/MapInput";
import { RoomType } from "../lib/barrel";
import { server } from "../lib/config";

const DashboardPage: NextPage = ({ init }) => {
  const Auth = useAuthUser();
  mapboxgl.accessToken =
    "pk.eyJ1IjoiZ2FybmF2YXVyaGEiLCJhIjoiY2tjZ3RiczFuMGFwMjJ5bGluOXN3YTdhaiJ9.WUkX31Fd9g1c9YQwFujJIA";
  const mapContainer = useRef<HTMLDivElement | null>(null);
  const map = useRef<null | mapboxgl.Map>(null);

  useEffect(() => {
    console.log(init);
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
    const response = await fetch(
      `${server}/api/init?id=61a83693444ddc3829a46f3a`
    );
    console.log(response.status);
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
