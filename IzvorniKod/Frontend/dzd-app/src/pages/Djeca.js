import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


import Header from "../components/Header";
import Footer from "../components/Footer";
import NovoDijeteForm from '../components/NovoDijeteForm';

function Djeca() {
    return (
        <React.Fragment>
            <Header></Header>
            <NovoDijeteForm/>
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
export default Djeca;