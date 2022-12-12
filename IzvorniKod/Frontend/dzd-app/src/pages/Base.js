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
      </React.Fragment>
      
    );
}
export default Base;
