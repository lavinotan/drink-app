import { useSelector, useDispatch } from "react-redux";
import FavoriteList from "../components/favorites/FavoriteList";
import { useEffect } from "react";

import { fetchDrinkData } from "../store/drink-action";

import LoadingSpinner from "../components/UI/LoadingSpinner";

// const DUMMY_DATA = [
//   {
//     id: "d1",
//     name: "West Coast IPA",
//     brewer: "Granville Island",
//     type: "Beer",
//     description: "This is a very good drink",
//     image:
//       "https://www.lcbo.com/content/dam/lcbo/products/015656.jpg/jcr:content/renditions/cq5dam.web.1280.1280.jpeg",
//     isFavorite: true,
//   },
//   {
//     id: "d2",
//     name: "Kavalan Classic Single Malt Whisky",
//     brewer: "Kavalan",
//     type: "Whisky",
//     description: "This is a very good whisky",
//     image:
//       "https://www.kavalanwhisky.com/data/goods/cover/1583222906956089100.png",
//     isFavorite: false,
//   },
// ];

let isInitial = true;

const Favorite = (props) => {
  //const favoriteDrinks = DUMMY_DATA.filter((drink) => drink.isFavorite);
  const favoriteDrinks = useSelector((state) =>
    state.drink.drinkItems.filter((drink) => drink.isFavorite)
  );
  const dataStatus = useSelector((state) => state.ui.dataStatus);
  const isLoading = !dataStatus || dataStatus.status === "pending";

  const dispatch = useDispatch();

  useEffect(() => {
    if (isInitial) {
      isInitial = false;
      dispatch(fetchDrinkData());
    }
  }, [dispatch]);

  let content = (
    <div className="text-center justify-content-center">
      <p>Got no favorites yet!</p>
    </div>
  );

  if (favoriteDrinks.length > 0 && !isLoading) {
    content = <FavoriteList drinks={favoriteDrinks} />;
  } else if (isLoading) {
    content = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  return content;
};

export default Favorite;
