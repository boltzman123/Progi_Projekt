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
import { StyledEngineProvider } from '@mui/material/styles';

const Djeca = () => {
  const [updatePage, setUpdatePage] = useState();
  return (
    <StyledEngineProvider injectFirst>
      <div className={HomeCSS.wrapChild}>
        <Header></Header>
        <div className={HomeCSS.split}>
          <div className={HomeCSS.splitItem}>
            <h3>Dodaj dijete</h3>
            <NovoDijeteForm updatePage={updatePage} setUpdatePage={setUpdatePage} />
          </div>
          <div className={HomeCSS.splitItem}>
            <h3>Pregled djece</h3>
            <DjecaList updatePage={updatePage} setUpdatePage={setUpdatePage} />
          </div>
        </div>
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
    </StyledEngineProvider>
  );
};
export default Djeca;
