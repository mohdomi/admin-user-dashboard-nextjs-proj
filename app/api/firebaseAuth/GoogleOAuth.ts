import { app, provider } from "@/app/api/firebaseAuth/main";
import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import { FirebaseError } from "firebase/app";

export default async function OAuth() {
  const auth = getAuth(app);

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);

    if (credential) {
      console.log(credential);
      const token = credential.accessToken;

      if (token) {
        return { userId: token };
      } else {
        console.log("No token received");
        return { userId: null };
      }
    } else {
      console.log("OAuth signin failed");
      return { userId: null };
    }
  } catch (error) {
    if (error instanceof FirebaseError && error.customData) {
      const errorCode = error.code;
      const errorMessage = error.message;
      const email = error.customData.email;
      const token = "Error";
      const credential = GoogleAuthProvider.credentialFromError(error);

      return { 
        userId: token,
        error: { errorCode, errorMessage, email, credential }
      };
    } else {
      const token = "Error";
      return { userId: token };
    }
  }
}
