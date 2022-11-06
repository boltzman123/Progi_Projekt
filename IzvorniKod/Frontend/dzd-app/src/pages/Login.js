import React from "react";
import Image from "../style/images/pic2.png";
import "../style/pages/Home.css";
import Footer from "../components/Footer";
import LoginAll from "../components/LoginAll";
import RegistracijaBtn from "../components/RegistracijaBtn";

function Login() {
  return (
    <React.Fragment>
      <div className="content">
            <div className="gallery">
                <div className="d2">
                    <img src={Image} ></img>
                </div>
                <div className="d1">
                    <div className="title">
                        Dobrodošli natrag <br />
                    </div>
                    <div classname="buttons">
                        <LoginAll />
                        <p>Nemas profil?</p>
                        <RegistracijaBtn />
                    </div>
                    
                </div>
            </div>
            <Footer></Footer>
      </div>
    </React.Fragment>
  );
}
export default Login;
