import React, { Component } from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";

function SharedLayout() {
  return (
    <React.Fragment>
      <Outlet></Outlet>
      <Footer></Footer>
    </React.Fragment>
  );
}

export default SharedLayout;
