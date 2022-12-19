import React, {useState, useEffect, Component} from "react";
import {toast} from "react-toastify"
import axios from "axios";
import MojaDonacijaKard from "./MojaDonacijaKard";
import KarticaCSS from '../style/components/Kartica.module.css'

function NeobjavljeneDonacije() {
  const [donacije, setDonacije] = useState([]);
  
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/donation/notvalid",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then((response) => {
        setDonacije(response.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Greška iz baze!");
      });

  },[]);

  if (donacije.length==0){
    console.log("Nema oglasa")
    return <div>Nema oglasa</div>
  }
  else {
    return (
        <div className={KarticaCSS.karticaList}>
            {donacije.map((donacija) => {
            return <MojaDonacijaKard key={donacija.idDonation} donacija={donacija}></MojaDonacijaKard>;
            })}
        </div>
    );
    }
}
export default NeobjavljeneDonacije;