import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Kartica from "../components/Kartica";
import { ToastContainer } from 'react-toastify';

function Base() {
    return (
      <React.Fragment>
        <Header />
        <Kartica />
        <Footer />
      </React.Fragment>
    );
}
export default Base;
