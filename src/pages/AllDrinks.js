import { useSelector, useDispatch } from "react-redux";
import DrinkList from "../components/drinks/DrinkList";

import LoadingSpinner from "../components/UI/LoadingSpinner";

import { useEffect } from "react";

import { fetchDrinkData } from "../store/drink-action";

import { drinkActions } from "../store/drink-slice";

let isInitial = true;

const AllDrinks = (props) => {
  const drinkData = useSelector((state) => state.drink);
  const dataStatus = useSelector((state) => state.ui.dataStatus);

  const dispatch = useDispatch();

  const isLoading = !dataStatus || dataStatus.status === "pending";

  //console.log(isLoading);

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(fetchDrinkData());
    }

    if (drinkData.isDrinkDataFetchRequired) {
      dispatch(fetchDrinkData());
      dispatch(drinkActions.setIsDrinkDataFetchRequired());
    }
  }, [dispatch, drinkData]);

  let content;

  if (isLoading) {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  } else {
    content = <DrinkList drinks={drinkData.drinkItems} />;
  }

  return content;
};

export default AllDrinks;
