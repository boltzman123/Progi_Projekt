import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Kartica from "../components/Kartica";
import { ToastContainer } from "react-toastify";
// import HomeCSS from "../style/pages/Home.module.css";


function Base() {
  return (
    <React.Fragment>
        <Header />
        <Kartica />
        <Footer name={"footerExpand"} />
    </React.Fragment>
  );
}
export default Base;
