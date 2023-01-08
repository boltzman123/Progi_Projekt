import React from "react";
import Image from "../style/images/pic2.png";
import HomeCSS from "../style/pages/Home.module.css"
import Footer from "../components/Footer";
import PrijavaBtn from "../components/PrijavaBtn";
import RegistracijaBtn from "../components/RegistracijaBtn";

function Home() {
  return (
    <React.Fragment>
      <div className={HomeCSS.content}>
        <div className={HomeCSS.gallery}>
          <div className={HomeCSS.d1}>
            <div className={HomeCSS.title}>
              Najbolje mjesto za donaciju <br></br>za Vaše dijete
            </div>
            <div>Doniraj danas i ti – djeca za djecu!</div>
            <div className={HomeCSS.buttons}>
              <PrijavaBtn />
              <RegistracijaBtn />
            </div>
          </div>
          <div className={HomeCSS.d2}>
            <img src={Image} alt="slika" ></img>
          </div>
        </div>
        <Footer name={"footerNormal"}></Footer>
      </div>
    </React.Fragment>
  );
}
export default Home;
