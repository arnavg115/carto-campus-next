import React from "react";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { CartoPage } from "../components/CartoPage";

const DashboardPage = () => {
  const AuthUser = useAuthUser();
  return (
    <CartoPage auth={AuthUser}>
      <p>Hello</p>
    </CartoPage>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(DashboardPage);
