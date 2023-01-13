import React from 'react';
import PUO from "../components/PUO";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ToastContainer } from "react-toastify";

const User = () => {
    
    return ( 
        <React.Fragment>
          <Header />
          <PUO />
          <Footer name={"footerProfil"}/>
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
 
export default User;