import { uiActions } from "./ui-slice";

import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const auth = getAuth();
const googleProvider = new GoogleAuthProvider();

export const loginWithGoogle = () => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const result = await signInWithPopup(auth, googleProvider);

      if (!result) {
        throw new Error("Google authentication failed!");
      }

      return result;
    };

    try {
      const result = await sendRequest();

      const email = result._tokenResponse.email;
      const emailText = email.split("@");
      const userName = emailText[0];

      const userData = {
        idToken: result._tokenResponse.idToken,
        localId: result._tokenResponse.localId,
        userName: userName,
      };

      //console.log(userName);

      dispatch(uiActions.login(userData));
    } catch (error) {
      alert(error);
      dispatch(
        uiActions.showDataStatus({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};

export const loginToApp = (loginData) => {
  return async (dispatch) => {
    const sendRequest = async () => {
      const response = await fetch(loginData.loginURL, {
        method: "POST",
        body: JSON.stringify({
          email: loginData.email,
          password: loginData.password,
          returnSecureToken: true,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMessage = data.error.message;
        throw new Error("Authentication failed! Error Info: " + errorMessage);
      }

      return data;
    };

    try {
      const data = await sendRequest();

      const email = data.email;
      const emailText = email.split("@");
      const userName = emailText[0];

      //console.log(data);

      const userData = {
        idToken: data.idToken,
        localId: data.localId,
        userName: userName,
      };

      console.log(userName);

      dispatch(uiActions.login(userData));
    } catch (error) {
      alert(error);
      dispatch(
        uiActions.showDataStatus({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );
    }
  };
};
