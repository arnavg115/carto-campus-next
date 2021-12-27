import React, { FC, useEffect, useRef, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import mapboxgl from "mapbox-gl";
import {
  AuthAction,
  AuthUserContext,
  getFirebaseAdmin,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { CartoPage } from "../components/CartoPage";
import MapInput from "../components/MapInput";
import { server } from "../lib/config";
import { useRouter } from "next/router";
import { get, getRoute, midpoint } from "../lib/clientUtils";
import DirBox from "../components/DirBox";
import { SETSCHOOL, State, wrapper } from "../lib/redux";
import { useSelector } from "react-redux";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import SchoolPicker from "../components/SchoolPicker";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";
import { Prefs, school, RoomType } from "../lib/clientTypes";

interface DashboardProps {
  init: RoomType[];
  school: school;
  schools: school[];
  prefs: Prefs;
}
const DashboardPage: FC<DashboardProps> = ({
  init,
  prefs,
  school,
  schools,
}) => {
  const Auth = useAuthUser();
  const state = useSelector((state) => state);
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
  useEffect(() => {
    if ((state as State).school !== school.name) {
      console.log("setting school");
    }
  }, [state]);
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
    const or = await get((state as State).school, origin);
    const dst = await get((state as State).school, dest);
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
    <CartoPage auth={Auth} landing={false} open={false}>
      <MapInput
        map={map}
        initSuggestion={init}
        nav={nav}
        resetDashboard={resetParent}
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
    </CartoPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  wrapper.getServerSideProps((store) =>
    // @ts-ignore
    async ({ AuthUser, req }: { AuthUser: AuthUserContext; req: NextApiRequestCookies }) => {
      if (!AuthUser.emailVerified) {
        return {
          props: {
            init: [],
          },
        };
      }

      const token = await AuthUser.getIdToken();
      if (!token) return { props: { init: [] } };
      const db = getFirebaseAdmin().firestore();
      const doc = await db.collection("users").doc(AuthUser.id!).get();

      if (!doc.exists) {
        return {
          props: {
            init: [],
            prefs: [],
          },
        };
      }
      store.dispatch({ type: SETSCHOOL, payload: doc.data()!.school });
      const query = gql`
        query Query($id: String!) {
          getSchools {
            zip
            name
            _id
          }
          getSchool(id: $id) {
            zip
            name
          }
        }
      `;
      const client = initializeApollo();
      const { data: queryData } = await client.query({
        query,
        variables: {
          id: doc.data()!.school,
        },
      });
      const response = await fetch(
        `${server}/api/init?id=${doc.data()!.school}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      const data = (await response.json()).data as RoomType[];

      return {
        props: {
          init: data,
          prefs: doc.data(),
          schools: queryData.getSchools,
          school: queryData.getSchool,
        },
      };
    }
  )
);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  // @ts-ignore
})(DashboardPage);
