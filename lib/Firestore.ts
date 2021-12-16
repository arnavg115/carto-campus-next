import firebase from "firebase";
import { AuthUserContext } from "next-firebase-auth";

export async function initUserFirestore(auth: AuthUserContext) {
  const firestore = firebase.firestore();
  if (!auth.email || !auth.id) {
    throw new Error("User is not logged in");
  }
  try {
    auth.getIdToken(true);
    await firestore.collection("users").doc(auth.id).set({
      school: "61a83693444ddc3829a46f3a",
      units: "metric",
    });
  } catch (error) {
    console.log(error);
  }
}
