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
import { server } from "../lib/config";
import { useRouter } from "next/router";
import { get, getRoute, midpoint } from "../lib/clientUtils";
import { SETSCHOOL, State, wrapper } from "../lib/redux";
import { useSelector } from "react-redux";
import { NextApiRequestCookies } from "next/dist/server/api-utils";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";

import { Prefs, school, RoomType } from "../lib/clientTypes";
import Map from "../components/Map";

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
  const router = useRouter();
  useEffect(() => {
    if (!Auth.emailVerified) {
      router.push("/verify");
    }
  }, []);

  return (
    <CartoPage auth={Auth} landing={false} open={false}>
      <Map
        Auth={Auth}
        prefs={prefs}
        init={init}
        school={school}
        schools={schools}
      />
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
