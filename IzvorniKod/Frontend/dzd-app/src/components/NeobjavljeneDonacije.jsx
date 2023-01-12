import React, {useState, useEffect, Component} from "react";
import {toast} from "react-toastify"
import axios from "axios";
import AdminDonacijaKard from "./AdminDonacijaKard";
import KarticaCSS from '../style/components/Kartica.module.css'

function NeobjavljeneDonacije() {
  const [donacije, setDonacije] = useState([]);
  
  useEffect(() => {
    axios({
      method: "get",
      url: "/api/donation/notvalid",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      auth: {
        username: "admin",
        password: "pass"
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
    return <div className={KarticaCSS.nevidljiv}>Nema oglasa</div>
  }
  else {
    return (
      <>
      <div className={KarticaCSS.okvir}>
        <h2>Neobjavljene donacije</h2>
        <hr/>
          <div className={KarticaCSS.karticaList}>
              {donacije.map((donacija) => {
              return <AdminDonacijaKard key={donacija.idDonation} donacija={donacija}></AdminDonacijaKard>;
              })}
          </div>
      </div>
      </>
    );
    }
}
export default NeobjavljeneDonacije;