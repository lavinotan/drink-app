import { useSelector, useDispatch } from "react-redux";
import DrinkList from "../components/drinks/DrinkList";

import LoadingSpinner from "../components/UI/LoadingSpinner";

import { Fragment, useCallback, useEffect, useState } from "react";

import { fetchDrinkData, removeDrinkData } from "../store/drink-action";
import { removeCommentData } from "../store/comment-action";

import { drinkActions } from "../store/drink-slice";
import Modal from "../components/UI/Modal";

let isInitial = true;

const AllDrinks = (props) => {
  const drinkData = useSelector((state) => state.drink);
  const dataStatus = useSelector((state) => state.ui.dataStatus);

  const dispatch = useDispatch();

  const isLoading = !dataStatus || dataStatus.status === "pending";

  const [modalIsShown, setModalIsShown] = useState(false);
  const [removeDrinkConfirmed, setRemoveDrinkConfirmed] = useState(false);

  useEffect(() => {
    //console.log(isLoading);
    if (isInitial) {
      isInitial = false;
      dispatch(fetchDrinkData());
    }

    if (drinkData.isDrinkDataFetchRequired && !isLoading) {
      dispatch(fetchDrinkData());
      dispatch(drinkActions.setIsDrinkDataFetchRequired());
      //console.log("Getting data");
    }
  }, [dispatch, drinkData, isLoading]);

  const removeDrinkHandler = useCallback(
    (drinkId) => {
      dispatch(drinkActions.setIsDrinkDataFetchRequired());
      dispatch(removeDrinkData(drinkId));
      dispatch(removeCommentData(drinkId));
      //setRemoveDrinkConfirmed(false);
      //console.log("removeDrinkHandler called");
      //console.log(isLoading);
    },
    [dispatch]
  );

  const removeDrinkConfirmedHandler = () => {
    setRemoveDrinkConfirmed(true);
    //console.log(removeDrinkConfirmed);
  };

  const showModalHandler = () => {
    setModalIsShown(true);
    //console.log(modalIsShown);
  };

  const hideModalHandler = () => {
    setModalIsShown(false);
    //console.log(modalIsShown);
  };

  let content;

  if (isLoading) {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  } else {
    content = (
      <Fragment>
        <DrinkList
          drinks={drinkData.drinkItems}
          onRemoveDrink={removeDrinkHandler}
          removeDrinkConfirmed={removeDrinkConfirmed}
          onShowModal={showModalHandler}
        />
        {modalIsShown && (
          <Modal
            onHideModal={hideModalHandler}
            onRemoveDrinkConfirmed={removeDrinkConfirmedHandler}
            title="Drink Removal Confirmation"
            message="Are you sure that you would like to remove the drink? (data will not be restored once it's removed)"
          />
        )}
      </Fragment>
    );
  }

  return content;
};

export default AllDrinks;
