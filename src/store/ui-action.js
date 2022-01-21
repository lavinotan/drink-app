import { uiActions } from "./ui-slice";

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

      //console.log(data);

      const userData = {
        idToken: data.idToken,
        localId: data.localId,
      };

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
