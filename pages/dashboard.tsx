import React from "react";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { CartoPage } from "../components/CartoPage";

const Demo = () => {
  const AuthUser = useAuthUser();
  return (
    <CartoPage auth={AuthUser}>
      <p>Hello</p>
    </CartoPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Demo);
