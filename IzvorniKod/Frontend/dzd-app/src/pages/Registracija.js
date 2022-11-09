import React from "react";
import MainImage from "../style/images/registracija_img.png";
import "../style/pages/Registracija.css";
import Footer from "../components/Footer";
import RegistracijaForm from "../components/RegistracijaForm";

function Registracija(){
    return (
        <React.Fragment>
            <div className="content">
                <div className="gallery">
                    <div className="d1">
                        <div className="title">Postani dio<br/>donatorske zajednice</div>
                        <div className="buttons">
                            <RegistracijaForm/>
                        </div>
                    </div>
                    <div className="d2">
                        <img src={MainImage} className="img"></img>
                    </div>
                </div>
                <Footer></Footer>
            </div>
        </React.Fragment>
    );
}

export default Registracija;