import React, { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from "../components/Header";
import Footer from "../components/Footer";
import NovaKategorijaForm from '../components/NovaKategorijaForm';
import NovaPotkategorijaForm from '../components/NovaPotkategorijaForm';


const Kategorije = () =>{
    const [updatePage, setUpdatePage] = useState();
    return (
        <React.Fragment>
            <Header></Header>
            <NovaKategorijaForm updatePage={updatePage} setUpdatePage={setUpdatePage}/>
            <NovaPotkategorijaForm updatePage={updatePage} setUpdatePage={setUpdatePage}/>
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
            <Footer></Footer>
        </React.Fragment>
    )
}
export default Kategorije;