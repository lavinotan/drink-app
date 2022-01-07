import { useDispatch } from "react-redux";
import { Link, useRouteMatch } from "react-router-dom";
import classes from "./DrinkItem.module.css";
import { drinkActions } from "../../store/drink-slice";
import { updateDrinkData } from "../../store/drink-action";

const DrinkItem = (props) => {
  const match = useRouteMatch();
  const dispatch = useDispatch();

  const toggleFavHandler = () => {
    dispatch(drinkActions.toggleFav(props.id));
    const updatedDrinkFavData = { id: props.id, isFavorite: !props.isFavorite };
    dispatch(updateDrinkData(updatedDrinkFavData));
  };

  const favBtnClass = props.isFavorite
    ? `${classes.likeBtn} ${classes.selected}`
    : classes.likeBtn;

  return (
    <div className="col-md-12">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col-4 d-lg-block">
          <img className={classes.image} src={props.image} alt={props.name} />
        </div>
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary">
            {props.type}
          </strong>
          <h3 className="mb-0">{props.name}</h3>
          <div className="mb-1 text-muted">{props.brewer}</div>
          <p className="card-text mb-auto">{props.description}</p>
          <Link to={`${match.path}/${props.id}`}>View Fullscreen</Link>
        </div>
        <div className={classes.btnContainter}>
          <button
            type="button"
            className={favBtnClass}
            onClick={toggleFavHandler}
            title="Add to favorite"
          >
            <svg
              className={classes.heart_icon}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
            >
              <path d="M91.6 13A28.7 28.7 0 0 0 51 13l-1 1-1-1A28.7 28.7 0 0 0 8.4 53.8l1 1L50 95.3l40.5-40.6 1-1a28.6 28.6 0 0 0 0-40.6z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DrinkItem;
