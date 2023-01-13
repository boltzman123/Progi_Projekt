import React from "react";
import Image from "../style/images/pic3.png";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import HomeCSS from "../style/pages/Home.module.css"
import LoginCSS from "../style/pages/Login.module.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  return (
    <React.Fragment>
      <div className={LoginCSS.contentLogin}>
        <div className={LoginCSS.galleryLogin}>
          <div className={LoginCSS.d1Login}>
            <img src={Image}></img>
          </div>
          <div className={LoginCSS.d2Login}>
            <div className={LoginCSS.titleLogin}>
              Dobrodošli natrag <br />
            </div>
              <LoginForm />
          </div>
        </div>
        <Footer name={"footerNormal"}/>
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
    </React.Fragment>
  );
}

export default Login;
