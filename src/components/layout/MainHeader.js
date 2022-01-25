import { NavLink, Link } from "react-router-dom";
import { uiActions } from "../../store/ui-slice";
import { useDispatch, useSelector } from "react-redux";

const MainHeader = (props) => {
  const isLoggedIn = useSelector((state) => state.ui.isLoggedIn);

  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(uiActions.logout());
  };

  return (
    <div className="container">
      <header
        className="
            d-flex
            flex-wrap
            align-items-center
            justify-content-center justify-content-md-between
            py-3
            mb-4
            border-bottom
          "
      >
        <NavLink
          to="/"
          className="
              d-flex
              align-items-center
              mb-3 mb-md-0
              text-dark text-decoration-none
            "
        >
          <svg className="bi me-2" width="40" height="32"></svg>
          <span className="fs-4">drink</span>
        </NavLink>

        <ul className="nav nav-pills">
          <li className="nav-item">
            <NavLink to="/drinks" className="nav-link" activeClassName="active">
              All Drinks
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/favorites"
              className="nav-link"
              activeClassName="active"
            >
              Favorites
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/new-drink"
              className="nav-link"
              activeClassName="active"
            >
              Add New Drink
            </NavLink>
          </li>
        </ul>
        <ul className="nav">
          {!isLoggedIn && (
            <li className="nav-item">
              <Link to="/auth" className="nav-link link-dark px-2">
                Login
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="nav-item">
              <Link to="/profile" className="nav-link link-dark px-2">
                Profile
              </Link>
            </li>
          )}
          {isLoggedIn && (
            <li className="nav-item">
              <Link
                to="#"
                onClick={logoutHandler}
                className="nav-link link-dark px-2"
              >
                Logout
              </Link>
            </li>
          )}
        </ul>
      </header>
    </div>
  );
};

export default MainHeader;
