import React from "react";
import Image from "../style/images/pic2.png";
import "../style/pages/Home.css";
import Footer from "../components/Footer";
import LoginForm from "../components/LoginForm";
import { Link } from "react-router-dom";

function Login() {

  return (
    <React.Fragment>
      <div className="content">
            <div className="gallery">
                <div className="d1">
                    <div className="title">
                        Dobrodošli natrag <br />
                    </div>
                    <div className="buttons">
                      <LoginForm />
                      <Link to={"/registracija"}> Nemas profil?</Link>
                    </div>
                </div>
                <div className="d2">
                    <img src={Image} ></img>
                </div>
            </div>
            <Footer />
      </div>
    </React.Fragment>
  );
}

export default Login;
