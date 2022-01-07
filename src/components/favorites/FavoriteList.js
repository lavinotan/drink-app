import FavoriteItem from "./FavoriteItem";
import { Fragment } from "react";

import classes from "./FavoriteList.module.css";

const FavoriteList = (props) => {
  const drinks = props.drinks;

  //console.log(drinks);
  return (
    <Fragment>
      <ul className={classes.list}>
        {drinks.map((drink) => (
          <FavoriteItem
            key={drink.id}
            id={drink.id}
            name={drink.name}
            brewer={drink.brewer}
            image={drink.image}
            description={drink.description}
            type={drink.type}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default FavoriteList;
