import firebase from "firebase";
import { Button, TextInput } from "grommet";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import "react-toastify/dist/ReactToastify.css";
import React from "react";
import { AuthBox } from "../components/AuthBox";
import CartoLoader from "../components/CartoLoader";
import NextLink from "../components/Link";
import { PasswordInput } from "../components/PasswordInput";
import { useField } from "../lib/hooks";
import { toast, ToastContainer } from "react-toastify";

const RegisterPage = () => {
  const [email, setEmail] = useField("");
  const [password, setPassword] = useField("");
  const [passwordConf, setPasswordConf] = useField("");

  const error = (msg: string) => {
    toast.error(msg, {
      position: "top-left",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const Register = async () => {
    const sub = email.split("@");
    if (sub.length === 2) {
      if (passwordConf !== password) {
        error("Passwords do not match");
      } else if (sub[1] === "pleasantonusd.net") {
        try {
          await firebase.auth().createUserWithEmailAndPassword(email, password);
        } catch (err) {
          const i: any = err;
          error(i.message);
        }
      } else {
        error("Email must be a pleasantonusd email.");
      }
    } else {
      error("Invalid email");
    }
  };

  return (
    <AuthBox>
      <h1>Register</h1>
      <TextInput value={email} onChange={setEmail} placeholder="Email" />
      <PasswordInput
        password={password}
        setPassword={setPassword}
        size={"small"}
      />
      <PasswordInput
        password={passwordConf}
        setPassword={setPasswordConf}
        placeholder="Confirm Your Password"
        size={"small"}
      />
      <Button
        label="Register"
        primary
        color="brand"
        onClick={async () => {
          await Register();
        }}
      />
      <p>
        Already have an account? <NextLink href="/login" text="Login" />{" "}
        instead.
      </p>
      <ToastContainer
        position="top-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
      />
    </AuthBox>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: CartoLoader,
})(RegisterPage);
