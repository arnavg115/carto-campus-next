import firestore from "firebase";
import { Box, Button, ResponsiveContext } from "grommet";
import {
  AuthAction,
  useAuthUser,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { NonMapPage } from "../components/NonMapPage";
import { initUserFirestore } from "../lib/Firestore";

function Verify() {
  const size = useContext(ResponsiveContext);
  const Auth = useAuthUser();
  const router = useRouter();
  const [sent, setSent] = useState(false);
  useEffect(() => {
    console.log("Hello from this component");
    if (Auth.emailVerified) {
      router.push("/");
    }
    return () => {
      initUserFirestore(Auth);
    };
  }, []);

  useEffect(() => {
    setSent(localStorage.getItem("sent")! === "true");
  }, []);

  const sendEmail = async () => {
    try {
      await firestore.auth().currentUser!.sendEmailVerification();
      setSent(true);
      alert("sent");
      localStorage.setItem("sent", "true");
    } catch (e) {
      alert(e);
    }
  };
  return (
    <NonMapPage title="Verify" auth={Auth}>
      {sent ? (
        <Box>
          <p>
            Sent the verification email. Once verified click the button below to
            refresh the page or if there has been an issue click the other
            button to resend the email.
          </p>
          <Box
            direction={size === "small" ? "column" : "row"}
            gap="small"
            width="100%"
          >
            <Button
              color="black"
              primary
              onClick={() => {
                router.reload();
              }}
              label="Reload"
            />
            <Button
              primary
              color="red"
              label="Resend"
              onClick={() => {
                sendEmail();
              }}
            />
          </Box>
        </Box>
      ) : (
        <Box margin={{ top: "10px" }}>
          <p>
            To use our service you must verify your email. The button below
            sends an email to the address you registered with.
          </p>
          <Button
            primary
            color="brand"
            onClick={() => {
              sendEmail();
            }}
            label="Send verification email"
          />
        </Box>
      )}
    </NonMapPage>
  );
}

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenUnauthedAfterInit: AuthAction.REDIRECT_TO_LOGIN,
})(Verify);
