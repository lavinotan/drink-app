import { drinkActions } from "./drink-slice";
import { uiActions } from "./ui-slice";
import { commentActions } from "./commnet-slice";

const FIREBASE_DOMAIN = "https://drinkapp-eb423-default-rtdb.firebaseio.com";

export const fetchDrinkData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showDataStatus({
        status: "pending",
        title: "Sending data",
        message: "Sending drink data.",
      })
    );

    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/drinks.json`);

      if (!response.ok) {
        throw new Error("Could not fetch drink data!");
      }

      //console.log(response);

      const data = await response.json();

      //console.log(data);

      const transformedDrinks = [];

      for (const key in data) {
        const drinkObj = {
          id: key,
          ...data[key],
        };

        transformedDrinks.push(drinkObj);
      }

      //console.log(transformedDrinks);

      return transformedDrinks;
    };

    try {
      let drinkData = await fetchData();

      //console.log(drinkData);

      await dispatch(
        drinkActions.replaceDrinkItems({
          drinkItems: drinkData || [],
        })
      );

      dispatch(
        uiActions.showDataStatus({
          status: "success",
          title: "Success!",
          message: "Sent drink data successfully!",
        })
      );
    } catch (error) {
      dispatch(
        uiActions.showDataStatus({
          status: "error",
          title: "Error!",
          message: error.message,
        })
      );

      //console.log(error.message);
    }
  };
};

export const sendDrinkData = (drinkData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showDataStatus({
        status: "pending",
        title: "Sending data",
        message: "Sending drink data.",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/drinks.json`, {
        method: "POST",
        body: JSON.stringify(drinkData),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Sending drink data failed!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showDataStatus({
          status: "success",
          title: "Success!",
          message: "Sent drink data successfully!",
        })
      );
    } catch (error) {
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

export const updateDrinkData = (drinkData) => {
  return async (dispatch) => {
    //console.log(drinkData);

    const sendRequest = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/drinks/${drinkData.id}.json`,
        {
          method: "PATCH",
          body: JSON.stringify({ isFavorite: drinkData.isFavorite }),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Sending drink data failed!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showDataStatus({
          status: "success",
          title: "Success!",
          message: "Sent drink data successfully!",
        })
      );
    } catch (error) {
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

export const fetchCommentData = (drinkId) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showDataStatus({
        status: "pending",
        title: "Sending data",
        message: "Sending drink data.",
      })
    );

    const fetchData = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/comments/${drinkId}.json`
      );

      if (!response.ok) {
        throw new Error("Could not fetch comment data!");
      }

      const data = await response.json();

      const tranformedComments = [];

      for (const key in data) {
        const commentObj = {
          id: key,
          ...data[key],
        };

        tranformedComments.push(commentObj);
      }

      //console.log(tranformedComments);

      return tranformedComments;
    };

    try {
      let commentData = await fetchData();

      dispatch(
        commentActions.replaceComments({
          comments: commentData || [],
        })
      );

      dispatch(
        uiActions.showDataStatus({
          status: "success",
          title: "Success!",
          message: "Sent drink data successfully!",
        })
      );
    } catch (error) {
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

export const sendCommentData = (requestData) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showDataStatus({
        status: "pending",
        title: "Sending data",
        message: "Sending drink data.",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(
        `${FIREBASE_DOMAIN}/comments/${requestData.drinkId}.json`,
        {
          method: "POST",
          body: JSON.stringify(requestData.commentData),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Sending drink data failed!");
      }
    };

    try {
      await sendRequest();

      dispatch(
        uiActions.showDataStatus({
          status: "success",
          title: "Success!",
          message: "Sent drink data successfully!",
        })
      );
    } catch (error) {
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
