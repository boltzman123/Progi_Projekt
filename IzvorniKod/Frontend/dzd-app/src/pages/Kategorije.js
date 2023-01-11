import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from "../components/Header";
import Footer from "../components/Footer";
import NovaKategorijaForm from '../components/NovaKategorijaForm';
import NovaPotkategorijaForm from '../components/NovaPotkategorijaForm';
import { StyledEngineProvider } from '@mui/material/styles';

import KategorijeCSS from "../style/pages/Kategorije.module.css";



const Kategorije = () =>{
    const [updatePage, setUpdatePage] = useState();
    return (
        <StyledEngineProvider>
            <div className={KategorijeCSS.wrapChild}>
                <Header></Header>
                <div className={KategorijeCSS.split}>
                    <div className={KategorijeCSS.splitItem}>
                        <h3>Nova kategorija</h3>
                        <NovaKategorijaForm updatePage={updatePage} setUpdatePage={setUpdatePage}/>
                    </div>
                    <div className={KategorijeCSS.splitItem}>
                        <h3>Nova potkategorija</h3>
                        <NovaPotkategorijaForm updatePage={updatePage} setUpdatePage={setUpdatePage}/>
                    </div>
                </div>
                <Footer name={"footerProfil"}></Footer>
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
        </StyledEngineProvider>
    )
}
export default Kategorije;