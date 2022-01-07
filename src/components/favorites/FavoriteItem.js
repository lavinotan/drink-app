import { Link, useRouteMatch, useHistory } from "react-router-dom";
import classes from "./FavoriteItem.module.css";

const HOME_URLNAME = "drinks";

const FavoriteItem = (props) => {
  const match = useRouteMatch();
  const history = useHistory();

  //console.log(match);
  //console.log(history);

  return (
    <div className="col-md-12">
      <div className="row g-0 border rounded overflow-hidden flex-md-row mb-4 shadow-sm h-md-250 position-relative">
        <div className="col-4 d-none d-lg-block">
          <img className={classes.image} src={props.image} alt={props.name} />
        </div>
        <div className="col p-4 d-flex flex-column position-static">
          <strong className="d-inline-block mb-2 text-primary">
            {props.type}
          </strong>
          <h3 className="mb-0">{props.name}</h3>
          <div className="mb-1 text-muted">{props.brewer}</div>
          <p className="card-text mb-auto">{props.description}</p>
          <Link to={`${HOME_URLNAME}/${props.id}`}>View Fullscreen</Link>
        </div>
      </div>
    </div>
  );
};

export default FavoriteItem;
