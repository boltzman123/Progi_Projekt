import React from "react";
import Image from "../style/images/pic3.png";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import "../style/pages/Login.css"
import { Link } from "react-router-dom";

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
    </React.Fragment>
  );
}

export default Login;
