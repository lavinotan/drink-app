import { Fragment, useEffect, useState } from "react";
import HighlightedDrink from "../components/drinks/HighlightedDrink";
import { Route, useRouteMatch, Link, useParams } from "react-router-dom/";
import { useDispatch } from "react-redux";
import Comments from "../components/comments/Comments";
import { fetchDrinkDataById } from "../store/drink-action";

const DrinkDetails = (props) => {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const [selectedDrink, setSelectedDrink] = useState({});

  //console.log(match);

  const params = useParams();
  const { drinkId } = params;

  useEffect(() => {
    dispatch(fetchDrinkDataById(drinkId)).then((response) =>
      setSelectedDrink(response)
    );
  }, [dispatch, drinkId]);

  //console.log(selectedDrink);

  // const highlightedDrink = useSelector((state) =>
  //   state.drink.drinkItems.find((drink) => drink.id === drinkId)
  // );

  return (
    <Fragment>
      <HighlightedDrink
        name={selectedDrink.name}
        image={selectedDrink.image}
        description={selectedDrink.description}
        type={selectedDrink.type}
        brewer={selectedDrink.brewer}
        id={selectedDrink.id}
        isFavorite={selectedDrink.isFavorite}
        abv={selectedDrink.abv}
      />
      <Route path={match.path} exact>
        <div className="text-center">
          <Link to={`${match.url}/comments`} className="btn btn-primary btn-sm">
            Load Reviews
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments drinkId={selectedDrink.id} />
      </Route>
    </Fragment>
  );
};

export default DrinkDetails;
