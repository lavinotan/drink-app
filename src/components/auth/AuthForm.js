// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY] sign up
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY] sign in
// https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=[API_KEY] get user data

import { Fragment, useEffect, useRef, useState } from "react";
import classes from "./AuthForm.module.css";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import { uiActions } from "../../store/ui-slice";
import { loginToApp, loginWithGoogle } from "../../store/ui-action";

const signInURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCXkXwXbt9Tp23b1jdBpbevKw0jRoyhTdw";
const signUpURL =
  "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCXkXwXbt9Tp23b1jdBpbevKw0jRoyhTdw";

const AuthForm = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.ui.isLoggedIn);

  const [isToLogin, setIsToLogin] = useState(true);
  //const [isLoggedIn, setIsLoggedIn] = useState(false);

  //const isLoading = !dataStatus || dataStatus.status === "pending";

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  useEffect(() => {
    if (isLoggedIn) {
      history.replace("/");
    }
  }, [isLoggedIn, history]);

  const switchAuthModeHandler = () => {
    setIsToLogin((prevState) => !prevState);
  };

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;

    //setIsLoading(true);

    let url;

    if (isToLogin) {
      url = signInURL;
    } else {
      url = signUpURL;
    }

    const loginData = {
      email: enteredEmail,
      password: enteredPassword,
      loginURL: url,
    };

    dispatch(loginToApp(loginData));
  };

  const loginWithGoogleHandler = () => {
    console.log("LoginWithGoogleHandler");
    dispatch(loginWithGoogle());
  };

  return (
    <Fragment>
      <div className="form-signin mb-5">
        <form onSubmit={submitHandler}>
          <h1 className="h3 mb-3 fw-normal text-center">
            {isToLogin ? "Please sign in" : "Sign Up"}
          </h1>

          <div className="form-floating">
            <input
              type="email"
              className="form-control"
              id="floatingInput"
              placeholder="name@example.com"
              required
              ref={emailInputRef}
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              ref={passwordInputRef}
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>

          <div className="text-center">
            <button className="w-75 btn btn-lg btn-primary" type="submit">
              {isToLogin ? "Sign in" : "Create Account"}
            </button>
            <button
              type="button"
              className="form-control-plaintext text-center mt-3"
              onClick={switchAuthModeHandler}
            >
              {isToLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>

          <hr className="my-5" />

          <div className="text-center mt-3">
            <button
              type="button"
              className={classes.loginButton}
              onClick={loginWithGoogleHandler}
            >
              <i className="fab fa-google"></i>Sign in with Google
            </button>
          </div>

          <p className="text-center text-muted">or</p>

          <div className="text-center mt-4">
            <Link
              to="/"
              className={`${classes.loginButton} text-decoration-none`}
            >
              Try without Login
            </Link>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default AuthForm;
