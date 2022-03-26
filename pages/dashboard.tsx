import React, { FC, useEffect, useState } from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import "react-toastify/dist/ReactToastify.css";
import {
  AuthAction,
  getFirebaseAdmin,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { CartoPage } from "../components/CartoPage";
import { server } from "../lib/config";
import { useRouter } from "next/router";
import { SetSchool } from "../lib/redux";
import { useDispatch } from "react-redux";
import { gql } from "@apollo/client";
import { initializeApollo } from "../lib/apollo";

import { Prefs, school, RoomType } from "../lib/clientTypes";
import Map from "../components/Map";
import { ToastContainer } from "react-toastify";

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
  const dispatch = useDispatch();
  useEffect(() => {
    if (!Auth.emailVerified) {
      router.push("/verify");
    } else {
      dispatch(SetSchool({ school: school._id, brwf: school.brwf }));
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
      <ToastContainer
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </CartoPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
    if (!AuthUser.emailVerified) {
      return {
        props: {
          init: [],
          school: {
            coord: [],
            prefs: {
              units: "metric",
            },
          },
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
          prefs: {
            units: "metric",
          },
        },
      };
    }
    console.log(doc.data()!.school);
    // store.dispatch({ type: SETSCHOOL, payload: doc.data()!.school });
    const query = gql`
      query Query($id: String!) {
        getSchools {
          zip
          name
          _id
        }
        getSchool(id: $id) {
          _id
          zip
          name
          coord
          brwf
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
);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  // @ts-ignore
})(DashboardPage);
