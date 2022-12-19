import React, {useState, useEffect, Component} from "react";
import {toast} from "react-toastify"
import axios from "axios";
import MojaDonacijaKard from "./MojaDonacijaKard";
import KarticaCSS from '../style/components/Kartica.module.css'

function MojeDonacije() {
  const [donacije, setDonacije] = useState([]);
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [mjesto, setMjesto] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [donate, setDonate] = useState('');
  const [sentMail, setSentMail] = useState('');
  
  useEffect(() => {

    setIme(JSON.parse(localStorage.getItem("user")).userName);
    setPrezime(JSON.parse(localStorage.getItem("user")).userSurname);
    setMjesto(JSON.parse(localStorage.getItem("user")).userLocation);
    setEmail(JSON.parse(localStorage.getItem("user")).email);
    setPass(JSON.parse(localStorage.getItem("user")).password);
    setDonate(JSON.parse(localStorage.getItem("user")).canDonate);
    setSentMail(JSON.parse(localStorage.getItem("user")).mailSent);
    console.log("Ispisujem userov email")
    console.log(email)

    axios({
      method: "get",
      url: `/api/donation/users/${email}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data:{
        userName: ime,
        userSurname: prezime,
        userLocation: mjesto,
        email: email,
        password: pass,
        canDonate: donate,
        mailSent: sentMail
      }
    })
      .then((response) => {
        setDonacije(response.data)
      })
      .catch((err) => {
        console.log(err)
        toast.error("Greška iz baze!");
      });

  },[email]);

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
export default MojeDonacije;