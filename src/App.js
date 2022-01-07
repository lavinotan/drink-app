import { Route, Redirect, Switch } from "react-router-dom";

import React, { useEffect, Suspense } from "react";

import AllDrinks from "./pages/AllDrinks";
import Favorites from "./pages/Favorites";
import DrinkDetails from "./pages/DrinkDetail";
import NewDrink from "./pages/NewDrink";
import Layout from "./components/layout/Layout";
import AuthPage from "./pages/AuthPage";

import { useDispatch, useSelector } from "react-redux";
import { fetchDrinkData } from "./store/drink-action";
import { sendDrinkData } from "./store/drink-action";

import LoadingSpinner from "./components/UI/LoadingSpinner";
import UserProfile from "./components/auth/UserProfile";

let isInitial = true;

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.ui.isLoggedIn);

  //dispatch(sendDrinkData(drink.drinkItems));
  //dispatch(fetchDrinkData());

  // useEffect(() => {
  //   if (isInitial) {
  //     isInitial = false;
  //     return;
  //   }

  //   if (drink.changed) {
  //     dispatch(sendDrinkData(drink.drinkItems));
  //   }
  // }, [drink, dispatch]);

  return (
    <Layout>
      <Suspense
        fallback={
          <div className="centered">
            <LoadingSpinner />
          </div>
        }
      >
        <Switch>
          <Route path="/" exact>
            <Redirect to="/drinks"></Redirect>
          </Route>
          <Route path="/drinks" exact>
            <AllDrinks />
          </Route>
          <Route path="/drinks/:drinkId">
            <DrinkDetails />
          </Route>
          <Route path="/favorites">
            <Favorites />
          </Route>
          <Route path="/new-drink">
            <NewDrink />
          </Route>
          <Route path="/auth">
            <AuthPage />
          </Route>
          {isLoggedIn && (
            <Route path="/auth">
              <AuthPage />
            </Route>
          )}
          {isLoggedIn && (
            <Route path="/profile">
              <UserProfile />
            </Route>
          )}
        </Switch>
      </Suspense>
    </Layout>
  );
}

export default App;
