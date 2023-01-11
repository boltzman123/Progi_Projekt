import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UsersList from "../components/UsersList";
import HomeCSS from "../style/pages/Home.module.css";


const UsersOverview = () => {
  return (
    <React.Fragment>
      <div className={HomeCSS.wrapUsers}>
        <Header />
        <UsersList />
        <Footer name={"footerExpand"} />
      </div>
    </React.Fragment>
  );
};

export default UsersOverview;
