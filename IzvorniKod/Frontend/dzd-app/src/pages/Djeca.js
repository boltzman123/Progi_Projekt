import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Header from "../components/Header";
import NovoDijeteForm from "../components/NovoDijeteForm";
import NovoDijeteCategoryPicker from "../components/NovoDijeteCategoryPicker";
import DjecaList from "../components/DjecaList";
import DijeteEditModal from "../components/DijeteEditModal";
import Footer from "../components/Footer";
import HomeCSS from "../style/pages/Home.module.css";


const Djeca = () => {
  const [updatePage, setUpdatePage] = useState();
  return (
    <React.Fragment>
      <div className={HomeCSS.wrapChild}>
        <Header></Header>
        <NovoDijeteForm updatePage={updatePage} setUpdatePage={setUpdatePage} />
        <DjecaList updatePage={updatePage} setUpdatePage={setUpdatePage} />
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
        <Footer name={"footerDeca"}></Footer>
      </div>
    </React.Fragment>
  );
};
export default Djeca;
