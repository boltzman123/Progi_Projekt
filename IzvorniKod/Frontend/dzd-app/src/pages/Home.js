import React from "react";
import Image from "../style/images/pic2.png";
import "../style/pages/Home.css";
import Footer from "../components/Footer";
import PrijavaBtn from "../components/PrijavaBtn";
import RegistracijaBtn from "../components/RegistracijaBtn";
function Home() {
  return (
    <React.Fragment>
      <div className="content">
        <div className="gallery">
          <div className="d1">
            <div className="title">
              Najbolje mjesto za donaciju <br></br>za Vaše dijete
            </div>
            <div>Doniraj danas i ti – djeca za djecu!</div>
            <div className="buttons">
              <PrijavaBtn></PrijavaBtn>
              <RegistracijaBtn></RegistracijaBtn>
            </div>
          </div>
          <div className="d2">
            <img src={Image} ></img>
          </div>
        </div>
        <Footer></Footer>
      </div>
    </React.Fragment>
  );
}
export default Home;
