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


  let user = JSON.stringify(localStorage.getItem("user"))
  
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
        <div className={KarticaCSS.karticaList} style={{display:primljen.length==0 ?"none":""}}>
          <div>Primljene donacije</div>
            {primljen.map((donacija) => {
            return <DonacijaKard key={donacija.idDonation} donacija={donacija}></DonacijaKard>;
            })}
        </div>
        <div className={KarticaCSS.karticaList} style={{display:sezona.length==0 ?"none":""}}>
          <div>Sezonske donacije</div>
            {sezona.map((donacija) => {
            return <DonacijaKard key={donacija.idDonation} donacija={donacija}></DonacijaKard>;
            })}
        </div>
        <div className={KarticaCSS.karticaList} style={{display:preporucen.length==0 ?"none":""}}>
          <div>Preporucene donacije</div>
            {preporucen.map((donacija) => {
            return <DonacijaKard key={donacija.idDonation} donacija={donacija}></DonacijaKard>;
            })}
        </div>
        <div className={KarticaCSS.karticaList} style={{display:aktivan.length==0 ?"none":""}}>
          <div>Aktivne donacije</div>
            {aktivan.map((donacija) => {
            return <DonacijaKard key={donacija.idDonation} donacija={donacija}></DonacijaKard>;
            })}
        </div> 
      </>
    );
    }
}
export default Kartica;