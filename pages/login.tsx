import firebase from "firebase";
import { Button, TextInput } from "grommet";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Link from "next/link";
import { useState } from "react";
import { AuthBox } from "../components/AuthBox";
import CartoLoader from "../components/CartoLoader";
import NextLink from "../components/Link";
import { PasswordInput } from "../components/PasswordInput";
import { useField } from "../lib/hooks";

const LoginPage = () => {
  const Login = async () => {
    try {
      await firebase.auth().signInWithEmailAndPassword(email, password);
    } catch (e: any) {
      alert(e.message);
    }
  };
  const [email, setEmail] = useField("");
  const [password, setPassword] = useField("");

  return (
    <AuthBox>
      <h1 style={{ color: "white" }}>Login</h1>
      <TextInput value={email} onChange={setEmail} placeholder="Email" />
      <PasswordInput password={password} setPassword={setPassword} />
      <Button
        label="Login"
        primary
        color="brand"
        onClick={async () => {
          await Login();
        }}
      />
      <div>
        <p>
          Need an account? <NextLink href="/register" text="Register" /> instead
          .
        </p>
        <p>
          Forgot your password? <NextLink href="/forgot" text="Reset" /> it.
        </p>
      </div>
    </AuthBox>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: CartoLoader,
})(LoginPage);
