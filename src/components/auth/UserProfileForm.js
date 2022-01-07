import { Fragment } from "react";

const UserProfileForm = () => {
  return (
    <Fragment>
      <div className="form-signin mb-5">
        <form>
          <h1 className="h3 mb-3 fw-normal text-center">
            Change your password
          </h1>

          <div className="form-floating mb-4">
            <input
              type="password"
              className="form-control"
              id="floatingPassword"
              placeholder="Password"
              required
              //ref={passwordInputRef}
            />
            <label htmlFor="floatingPassword">New Password</label>
          </div>

          <div className="text-center">
            <button className="w-50 btn btn-sm btn-primary" type="submit">
              Change Password
            </button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default UserProfileForm;
