import type { NextPage } from "next";
import {
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import Link from "next/link";
const Home: NextPage = () => {
  const AuthUser = useAuthUser();
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "grid",
        placeItems: "center",
      }}
    >
      <div>
        <h1>Carto-Nextjs</h1>
        {AuthUser.email ? (
          <div>
            {" "}
            <p>{AuthUser.email}</p>
            <button
              onClick={async () => {
                await AuthUser.signOut();
              }}
            >
              Signout
            </button>
          </div>
        ) : (
          <Link href="/login">Sign in</Link>
        )}
      </div>
    </div>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser()(Home);
