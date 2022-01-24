import { Fragment } from "react";
import DrinkItem from "./DrinkItem";

import classes from "./DrinkList.module.css";

const DrinkList = (props) => {
  const drinks = props.drinks;

  return (
    <Fragment>
      <ul className={classes.list}>
        {drinks.map((drink) => (
          <DrinkItem
            key={drink.id}
            id={drink.id}
            name={drink.name}
            brewer={drink.brewer}
            image={drink.image}
            description={drink.description}
            type={drink.type}
            isFavorite={drink.isFavorite}
            onRemoveDrink={props.onRemoveDrink}
            removeDrinkConfirmed={props.removeDrinkConfirmed}
            onShowModal={props.onShowModal}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default DrinkList;
