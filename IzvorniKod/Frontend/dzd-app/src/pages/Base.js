import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Image from "../style/images/pic2.png";
import BaseCSS from "../style/pages/Base.module.css";


function Base() {
  return (
    <React.Fragment>
      <div className={BaseCSS.content}>
      <Header />
        <div className="gallery">
          <div className="d1">
            <div className="title">
              Dobrodošli na osnovnu stranicu
              <br />
            </div>
          </div>
          <div className="d2">
            <img src={Image} alt="slika"></img>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
export default Base;
