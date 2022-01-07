import { NavLink } from "react-router-dom";

const Footer = (props) => {
  return (
    <div className="container">
      <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
        <div className="col-md-4 d-flex align-items-center">
          <span className="text-muted">
            &copy; Lavino Tân - All rights reserved.
          </span>
        </div>

        <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
          <li className="ms-3">
            <a
              className="text-muted"
              href="https://github.com/lavinotan"
              target="_blank"
            >
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#github" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-muted"
              href="https://www.linkedin.com/in/lavinoweichungchen/"
              target="_blank"
            >
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#linkedin" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a
              className="text-muted"
              href="https://www.facebook.com/lavinotw"
              target="_blank"
            >
              <svg className="bi" width="24" height="24">
                <use xlinkHref="#facebook" />
              </svg>
            </a>
          </li>
        </ul>
      </footer>
    </div>
  );
};

export default Footer;
