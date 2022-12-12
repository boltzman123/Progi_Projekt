import React, {useState, useEffect, Component} from "react";
import {toast} from "react-toastify"
import axios from "axios";
import DonacijaKard from "./DonacijaKard";
import KarticaCSS from '../style/components/Kartica.module.css'

function Kartica() {
  const [donacije, setDonacije] = useState([]);
  
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/donation",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then((response) => {
        setDonacije(response.data)
      })
      .catch((err) => {
        toast.error("Greška iz baze!");
      });

  }, []);

  if (donacije.length==0){
    console.log("Nema oglasa")
    return <div>Nema oglasa</div>
  }
  else {
    return (
        <div className={KarticaCSS.karticaList}>
            {donacije.map((donacija) => {
            return <DonacijaKard key={donacija.idDonation} donacija={donacija}></DonacijaKard>;
            })}
        </div>
    );
    }
}
export default Kartica;