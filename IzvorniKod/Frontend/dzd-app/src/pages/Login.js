import React from "react";
import Image from "../style/images/pic3.png";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import "../style/pages/Login.css"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  return (
    <React.Fragment>
      <div className="contentLogin">
        <div className="galleryLogin">
          <div className="d1Login">
            <img src={Image}></img>
          </div>
          <div className="d2Login">
            <div className="title">
              Dobrodošli natrag <br />
            </div>
              <LoginForm />
          </div>
        </div>
        <Footer />
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
