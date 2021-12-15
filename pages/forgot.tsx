import firebase from "firebase";
import { Button, TextInput } from "grommet";
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from "next-firebase-auth";
import { useRouter } from "next/router";

import React from "react";
import { AuthBox } from "../components/AuthBox";

import { useField } from "../lib/hooks";

const ForgotPage = () => {
  const router = useRouter();
  const [email, setEmail] = useField("");
  const sendEmail = async () => {
    if (email === "" || !email.includes("@")) {
      alert("Invalid email");
      return;
    }
    try {
      await firebase.auth().sendPasswordResetEmail(email);
      alert("Sent Email");
      router.push("/");
    } catch (err) {
      alert("Server error. Please try again later.");
    }
  };
  return (
    <AuthBox>
      <h2>Password Reset</h2>
      <p style={{ fontSize: "15px", lineHeight: "15px" }}>
        To reset your password enter the email your account is associated with.
        Then click on the Send Email button, which sends an email to this
        address containing more details on how to reset your password.
      </p>
      <TextInput value={email} onChange={setEmail} placeholder="Email" />
      <Button
        label="Send Email"
        primary
        color="brand"
        onClick={() => {
          sendEmail();
        }}
      />
    </AuthBox>
  );
};

export const getServerSideProps = withAuthUserTokenSSR()();

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(ForgotPage);
