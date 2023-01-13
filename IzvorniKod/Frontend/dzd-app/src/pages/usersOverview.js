import React from "react";

import Header from "../components/Header";
import Footer from "../components/Footer";
import UsersList from "../components/UsersList";
import HomeCSS from "../style/pages/Home.module.css";
import { ToastContainer } from "react-toastify";


const UsersOverview = () => {
  return (
    <React.Fragment>
      <div className={HomeCSS.wrapUsers}>
        <Header />
        <UsersList />
        <Footer name={"footerExpand"} />
        <ToastContainer
                    position="top-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="light"
                />
      </div>
    </React.Fragment>
  );
};

export default UsersOverview;
