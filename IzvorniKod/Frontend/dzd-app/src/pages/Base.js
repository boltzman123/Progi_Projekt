import React from "react";
import "../style/pages/Home.css";
import Footer from "../components/Footer";
import Image from "../style/images/pic2.png";

function Home() {
  return (
    <React.Fragment>
      <div className="content">
        <div className="gallery">
          <div className="d1">
            <div className="title">
              Dobrodošli na osnovnu stranicu<br />
            </div>
          </div>
          <div className="d2">
            <img src={Image} alt="slika" ></img>
          </div>
        </div>
        <Footer />
      </div>
    </React.Fragment>
  );
}
export default Home;
