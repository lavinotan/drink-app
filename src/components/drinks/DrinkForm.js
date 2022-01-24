import { Fragment, useRef, useState } from "react";
import Card from "../UI/Card";
import { Prompt } from "react-router-dom/";

import classes from "./DrinkForm.module.css";

const DrinkForm = (props) => {
  const [isEntering, setIsEntering] = useState(false);

  const nameInputRef = useRef();
  const brewerInputRef = useRef();
  const typeInputRef = useRef();
  const imageInputRef = useRef();
  const descriptionInputRef = useRef();
  const abvInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredBrewer = brewerInputRef.current.value;
    const enteredType = typeInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const enteredAbv = abvInputRef.current.value;

    const drinkData = {
      name: enteredName,
      brewer: enteredBrewer,
      type: enteredType,
      image: enteredImage,
      description: enteredDescription,
      isFavorite: false,
      abv: enteredAbv,
    };

    props.onAddDrink(drinkData);
  };

  const finishEnteringHandler = () => {
    setIsEntering(false);
  };

  const formFocusedHandler = () => {
    setIsEntering(true);
  };

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message={(location) =>
          "Are you sure you want to leave? All your entered data will be lost!"
        }
      />
      <Card>
        <form
          onSubmit={submitHandler}
          onFocus={formFocusedHandler}
          className="needs-validation"
          noValidate
        >
          <div className="row g-3">
            <div className="col-sm-6">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="e.g. Heineken Larger"
                id="name"
                ref={nameInputRef}
                required
              />
            </div>
            <div className="col-sm-6">
              <label htmlFor="brewer" className="form-label">
                Brewer
              </label>
              <input
                className="form-control"
                type="text"
                placeholder="e.g. Heineken"
                required
                id="brewer"
                ref={brewerInputRef}
              />
            </div>
            <div className="col-md-5">
              <label htmlFor="type" className="form-label">
                Type
              </label>
              <select
                className="form-select"
                name="type"
                id="type"
                required
                ref={typeInputRef}
              >
                <option value="Beer">Beer</option>
                <option value="Whisky">Whisky</option>
                <option value="Vodka">Vodka</option>
                <option value="Wine">Wine</option>
                <option value="Sake">Sake</option>
                <option value="Coolers">Coolers & Ciders</option>
                <option value="Spirit">Other Spirit</option>
              </select>
            </div>
            <div className="col-sm-6">
              <label htmlFor="abv" className="form-label">
                ABV (Alcohol by Volume %)
              </label>
              <input
                className="form-control"
                type="number"
                required
                id="abv"
                placeholder="%"
                step="any"
                ref={abvInputRef}
              />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="image">
                Image URL
              </label>
              <input
                className="form-control"
                placeholder="http://example.com"
                type="url"
                required
                id="image"
                ref={imageInputRef}
              />
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor="description">
                Description
              </label>
              <textarea
                className="form-control"
                id="description"
                required
                rows="5"
                ref={descriptionInputRef}
              ></textarea>
            </div>
          </div>

          <hr className="my-4" />

          <div className={classes.btnContainer}>
            <button
              type="submit"
              className="btn btn-primary btn-lg"
              onClick={finishEnteringHandler}
            >
              Add
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default DrinkForm;
