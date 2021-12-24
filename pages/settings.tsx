import firebase from "firebase";
import {
  AuthAction,
  getFirebaseAdmin,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { Down } from "grommet-icons";

import { initializeApollo } from "../lib/apollo";
import React, { useEffect, useState } from "react";
import NextLink from "../components/Link";
import { NonMapPage } from "../components/NonMapPage";
import { gql } from "@apollo/client";
import { Select } from "grommet";

const settings = (props: any) => {
  const auth = useAuthUser();
  useEffect(() => {
    console.log(props);
  }, []);
  const [units, setUnits] = useState(props.prefs.units as string);
  const [school, setSchool] = useState(props.school as string);
  if (!auth.emailVerified) {
    return (
      <NonMapPage auth={auth} title="Verify">
        Please verify your email address here{" "}
        <NextLink href="/verify" text="verify" />
      </NonMapPage>
    );
  }
  return (
    <NonMapPage auth={auth} title="Settings">
      <h2 style={{ margin: "0px" }}>Units</h2>
      <Select
        value={units}
        options={["imperial", "metric"]}
        onChange={({ option }) => {
          setUnits(option);
        }}
        icon={<Down size="small" />}
      />
      <h2>School</h2>
      <Select
        value={school}
        // options={["University of Waterloo", "University of Toronto"]}
        options={props.schools.map((s: any) => s.name)}
        onChange={({ option }) => {
          setSchool(option);
        }}
        icon={<Down size="small" />}
      />
    </NonMapPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
    const query = gql`
      query Query {
        getSchools {
          name
          _id
        }
      }
    `;

    const schoolQuery = gql`
      query Query($id: String!) {
        getSchool(id: $id) {
          name
        }
      }
    `;
    const client = initializeApollo();
    if (AuthUser.emailVerified && AuthUser.id) {
      const db = getFirebaseAdmin().firestore();
      const user = await db.collection("users").doc(AuthUser.id).get();
      if (!user.exists) {
        await db.collection("users").doc(AuthUser.id).set({
          units: "metric",
          school: "61a83693444ddc3829a46f3a",
        });
        const user = await db.collection("users").doc(AuthUser.id).get();
        const res = await client.query({
          query: schoolQuery,
          variables: { id: user.data()!.school },
        });
        const { data } = await client.query({ query });
        return {
          props: {
            prefs: user.data(),
            schools: data.getSchools,
            school: res.data.getSchool.name,
          },
        };
      } else {
        const { data } = await client.query({ query });
        const res = await client.query({
          query: schoolQuery,
          variables: { id: user.data()!.school },
        });

        return {
          props: {
            prefs: user.data(),
            schools: data.getSchools,
            school: res.data.getSchool.name,
          },
        };
      }
    }
    return { props: {} };
  }
);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(settings);
