import { Fragment } from "react";
import HighlightedDrink from "../components/drinks/HighlightedDrink";
import { Route, useRouteMatch, Link, useParams } from "react-router-dom/";
import { useSelector } from "react-redux";
import Comments from "../components/comments/Comments";

const DrinkDetails = (props) => {
  const match = useRouteMatch();

  //console.log(match);

  const params = useParams();
  const { drinkId } = params;

  const highlightedDrink = useSelector((state) =>
    state.drink.drinkItems.find((drink) => drink.id === drinkId)
  );

  return (
    <Fragment>
      <HighlightedDrink
        name={highlightedDrink.name}
        image={highlightedDrink.image}
        description={highlightedDrink.description}
        type={highlightedDrink.type}
        brewer={highlightedDrink.brewer}
        id={highlightedDrink.id}
        isFavorite={highlightedDrink.isFavorite}
        abv={highlightedDrink.abv}
      />
      <Route path={match.path} exact>
        <div className="text-center">
          <Link to={`${match.url}/comments`} className="btn btn-primary btn-sm">
            Load Reviews
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments drinkId={highlightedDrink.id} />
      </Route>
    </Fragment>
  );
};

export default DrinkDetails;
