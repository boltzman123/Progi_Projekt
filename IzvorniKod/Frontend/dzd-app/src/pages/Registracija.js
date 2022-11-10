import React from "react";
import MainImage from "../style/images/registracija_img.png";
import "../style/pages/Registracija.css";
import Footer from "../components/Footer";
import RegistracijaForm from "../components/RegistracijaForm";

function Registracija(){
    return (
        <React.Fragment>
            <div className="register contentRegister">
                <div className="galleryRegister">
                    <div className="d1Register">
                        <img src={MainImage} className="imgRegister"></img>
                    </div>
                    <div className="d2Register">
                        <div className="titleRegister">Postani dio<br/>donatorske zajednice</div>
                        <RegistracijaForm/>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </React.Fragment>
    );
}

export default Registracija;