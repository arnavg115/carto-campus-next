import firebase from "firebase";
import { withAuthUser, AuthAction } from "next-firebase-auth";
import Link from "next/link";
import { useState } from "react";

const MyLoader = () => <div>Loading...</div>;

const LoginPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const login = async () => {
    await firebase.auth().signInWithEmailAndPassword(Email, Password);
  };

  return (
    <div>
      <h1>Login</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          login();
        }}
      >
        <input
          placeholder="email"
          type="text"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="password"
          type="password"
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>

      <Link href="/register">Register</Link>
    </div>
  );
};

export default withAuthUser({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  whenUnauthedBeforeInit: AuthAction.SHOW_LOADER,
  whenUnauthedAfterInit: AuthAction.RENDER,
  LoaderComponent: MyLoader,
})(LoginPage);
