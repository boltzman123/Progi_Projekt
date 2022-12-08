import React from "react";
import "../style/pages/Home.css";
import Footer from "../components/Footer";
import Image from "../style/images/pic2.png";
import { Link } from "react-router-dom";

function Base() {

  const Logout = (t)=>{
    console.log("Brisem usera iz localStoragea")
    localStorage.removeItem("user")
  }

  return (
    <React.Fragment>
      <div className="content">
        <div className="gallery">
          <div className="d1">
            <div className="title">
              Dobrodošli na osnovnu stranicu<br />
            </div>
            {/* sad je tu trenutno gumb, ali bude kasnije u headeru */}
            <button onClick={() => Logout()}> 
              Logout
            </button>
            <Link to={"/user"}>
              <button> 
                Moj profil
              </button>
            </Link>
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
export default Base;
