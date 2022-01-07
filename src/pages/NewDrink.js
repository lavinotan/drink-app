import { useDispatch, useSelector } from "react-redux";
import DrinkForm from "../components/drinks/DrinkForm";

import { sendDrinkData } from "../store/drink-action";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { uiActions } from "../store/ui-slice";
import { drinkActions } from "../store/drink-slice";

const NewDrink = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const dataStatus = useSelector((state) => state.ui.dataStatus);
  const [isDrinkAdded, setIsDrinkAdded] = useState(false);

  useEffect(() => {
    if (isDrinkAdded && dataStatus && dataStatus.status === "success") {
      dispatch(drinkActions.setIsDrinkDataFetchRequired());
      setIsDrinkAdded(false);
      history.push("/drinks");
    }
  }, [dataStatus, history]);

  const addDrinkHandler = (enteredDrinkData) => {
    dispatch(sendDrinkData(enteredDrinkData));
    setIsDrinkAdded(true);
  };
  return <DrinkForm onAddDrink={addDrinkHandler} />;
};

export default NewDrink;
