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
import React, { FC, useState } from "react";
import NextLink from "../components/Link";
import { NonMapPage } from "../components/NonMapPage";
import { gql } from "@apollo/client";
import { Box, Button, Select } from "grommet";
import { Prefs, school } from "../lib/clientTypes";
import { useRouter } from "next/router";
import { toast, ToastContainer } from "react-toastify";

interface SettingsProps {
  school: school;
  schools: school[];
  prefs: Prefs;
}

const Settings: FC<SettingsProps> = (props) => {
  const auth = useAuthUser();
  const router = useRouter();

  const [units, setUnits] = useState(props.prefs.units as string);
  const [school, setSchool] = useState(
    `${props.school.name}:${props.school.zip}`
  );
  const save = async () => {
    const zip = parseInt(school.split(":")[1]);
    const name = school.split(":")[0];
    const query = gql`
      query Query($name: String!, $zip: Int!) {
        getSchoolByName(name: $name, zip: $zip) {
          _id
        }
      }
    `;
    const client = initializeApollo();
    const { data } = await client.query({
      query,
      variables: {
        name,
        zip,
      },
    });

    await firebase.firestore().collection("users").doc(auth.id!).set({
      units,
      school: data.getSchoolByName._id,
    });
  };
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
      <Box gap="small" margin={{ top: "30px" }}>
        <h2 style={{ margin: "0px" }}>Units</h2>
        <Select
          value={units.charAt(0).toUpperCase() + units.slice(1)}
          options={["Imperial", "Metric"]}
          onChange={({ option }: { option: string }) => {
            setUnits(option.toLowerCase());
          }}
          icon={<Down size="small" />}
        />
        <h2>School</h2>
        <Select
          value={school}
          options={props.schools.map((s: any) => `${s.name}:${s.zip}`)}
          onChange={({ option }) => {
            setSchool(option);
          }}
          icon={<Down size="small" />}
        />
        <Box width="100%" align="center">
          <Button
            label="save"
            color="black"
            style={{
              width: "100px",
            }}
            primary
            onClick={() => {
              toast.promise(save, {
                pending: "Loading",
                success: "Settings Saved Successfully",
                error: {
                  render({ data }: { data: Error }) {
                    return `Error: ${data.message}`;
                  },
                },
              });
            }}
          />
        </Box>
      </Box>
      <ToastContainer theme="dark" />
    </NonMapPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()(
  async ({ AuthUser }) => {
    const query = gql`
      query Query {
        getSchools {
          zip
          name
          _id
        }
      }
    `;

    const schoolQuery = gql`
      query Query($id: String!) {
        getSchool(id: $id) {
          zip
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
            schools: data.getSchools as school[],
            school: res.data.getSchool as school,
          },
        };
      }
    }
    return {
      props: {
        prefs: {
          units: "metric",
        },
        school: {
          name: "",
          zip: 94588,
        },
      },
    };
  }
);

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
  // @ts-ignore
})(Settings);
