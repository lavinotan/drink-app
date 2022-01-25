import { drinkActions } from "./drink-slice";
import { uiActions } from "./ui-slice";

const FIREBASE_DOMAIN = "https://drinkapp-eb423-default-rtdb.firebaseio.com";

export const fetchDrinkData = () => {
  return async (dispatch) => {
    dispatch(
      uiActions.showDataStatus({
        status: "pending",
        title: "Getting data",
        message: "Getting drink data.",
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

      //console.log("fetchData" + drinkData);

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

export const fetchDrinkDataById = (drinkId) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showDataStatus({
        status: "pending",
        title: "Getting data",
        message: "Getting drink data.",
      })
    );

    const fetchData = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/drinks/${drinkId}.json`);

      if (!response.ok) {
        throw new Error("Could not fetch drink data!");
      }

      //console.log(response);

      const data = await response.json();

      const drinkObj = {
        id: drinkId,
        name: data.name,
        image: data.image,
        description: data.description,
        type: data.type,
        brewer: data.brewer,
        isFavorite: data.isFavorite,
        abv: data.abv,
      };

      //console.log(drinkObj);

      return drinkObj;
    };

    try {
      let drinkData = await fetchData();

      //console.log(drinkData);

      dispatch(
        uiActions.showDataStatus({
          status: "success",
          title: "Success!",
          message: "Sent drink data successfully!",
        })
      );

      return drinkData;
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

export const removeDrinkData = (id) => {
  return async (dispatch) => {
    dispatch(
      uiActions.showDataStatus({
        status: "pending",
        title: "Removing data",
        message: "Removing drink item.",
      })
    );

    const sendRequest = async () => {
      const response = await fetch(`${FIREBASE_DOMAIN}/drinks/${id}.json`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Removing drink data failed!");
      }
    };

    try {
      await sendRequest();

      //console.log("removeDrinkData");

      dispatch(
        uiActions.showDataStatus({
          status: "success",
          title: "Success!",
          message: "Remove drink data successfully!",
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
