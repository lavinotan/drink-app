import MainHeader from "./MainHeader";
import Footer from "./Footer";
import { Fragment } from "react";

const Layout = (props) => {
  return (
    <Fragment>
      <MainHeader />
      <main className="container">{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
