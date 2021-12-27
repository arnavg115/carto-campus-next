import { gql } from "@apollo/client";
import { Select } from "grommet";
import Cookies from "js-cookie";
import React, { FC, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { initializeApollo } from "../lib/apollo";
import { school } from "../lib/clientTypes";
import { SetSchool, State } from "../lib/redux";
import styles from "../styles/Dashboard.module.css";

interface SchoolProps {
  initSchool: school;
  schools: school[];
}

const SchoolPicker: FC<SchoolProps> = ({ initSchool, schools }) => {
  const state = useSelector<State>((state) => state);
  const dispatch = useDispatch();
  const [school, setSchool] = useState(`${initSchool.name}:${initSchool.zip}`);
  return (
    <div className={styles.schoolBox}>
      <Select
        value={school}
        onChange={async ({ option }: { option: string }) => {
          setSchool(option);
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
              name: option.split(":")[0],
              zip: parseInt(option.split(":")[1]),
            },
          });
          dispatch(SetSchool(data.getSchoolByName._id));
        }}
        options={schools.map((s) => `${s.name}:${s.zip}`)}
      />
    </div>
  );
};

export default SchoolPicker;
