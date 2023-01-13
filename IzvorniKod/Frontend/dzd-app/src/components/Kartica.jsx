import React, {useState, useEffect, Component} from "react";
import {toast} from "react-toastify"
import axios from "axios";
import DonacijaKard from "./DonacijaKard";
import KarticaCSS from '../style/components/Kartica.module.css'


function Kartica() {
  const [aktivan, setAktivan] = useState([]);
  const [primljen, setPrimljen] = useState([]);
  const [preporucen, setPreporucen] = useState([]);
  const [sezona, setSezona] = useState([]);


  let user = JSON.parse(localStorage.getItem("user"))
  
  useEffect(() => {
    axios({
      method: "get",
      url: `/api/donation/user/${user.email}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      }
    })
      .then((response) => {
        setAktivan(response.data.aktivan)
        setPrimljen(response.data.primljen)
        setPreporucen(response.data.preporucen)
        setSezona(response.data.sezona)
      })
      .catch((err) => {
        toast.error("Greška iz baze!");
      });

  }, []);

  if (aktivan.length==0 && primljen.length==0 && preporucen.length==0 && sezona.length==0 ){
    console.log("Nema oglasa")
    return <div className={KarticaCSS.nevidljiv}>Nema oglasa</div>
  }
  else {
    return (
      <>
        <div className={KarticaCSS.okvirPlavi}  style={{display:primljen.length==0 ?"none":""}}>
          <h2>Donacije za prosljeđivanje</h2>
          <hr />
          <div className={KarticaCSS.karticaListPlava}>
              {primljen.map((donacija) => {
              return <DonacijaKard key={donacija.idDonation} donacija={donacija}></DonacijaKard>;
              })}
          </div>
        </div>

        <div className={KarticaCSS.okvir}  style={{display:sezona.length==0 ?"none":""}}>
        <h2>Sezonske donacije za prosljeđivanje</h2>
        <hr />
          <div className={KarticaCSS.karticaList}>
              {sezona.map((donacija) => {
              return <DonacijaKard key={donacija.idDonation} donacija={donacija}></DonacijaKard>;
              })}
          </div>
        </div>

        <div className={KarticaCSS.okvirPlavi}  style={{display:preporucen.length==0 ?"none":""}}>
        <h2>Preporučene donacije</h2>
        <hr />
          <div className={KarticaCSS.karticaListPlava}>
              {preporucen.map((donacija) => {
              return <DonacijaKard key={donacija.idDonation} donacija={donacija} istaknut={true}></DonacijaKard>;
              })}
          </div>
        </div>

        <div className={KarticaCSS.okvir}  style={{display:aktivan.length==0 ?"none":""}}>
        <h2>Aktivne donacije</h2>
        <hr />
          <div className={KarticaCSS.karticaList}>
              {aktivan.map((donacija) => {
              return <DonacijaKard key={donacija.idDonation} donacija={donacija} ></DonacijaKard>;
              })}
          </div>
        </div> 
      </>
    );
    }
}
export default Kartica;