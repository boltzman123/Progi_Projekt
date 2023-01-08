import React, {useState, useEffect} from "react";
import axios from "axios";
import MojaDonacijaKard from "./MojaDonacijaKard";
import MojiOglasiCSS from '../style/components/MojiOglasi.module.css'

function MojeDonacije() {
  const [donacije, setDonacije] = useState([]);
  const [ime, setIme] = useState('');
  const [prezime, setPrezime] = useState('');
  const [mjesto, setMjesto] = useState('');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [donate, setDonate] = useState('');
  const [sentMail, setSentMail] = useState('');
  const [doniraniOglasiList, setdoniraniOglasiList] = useState([]);
  const [mojiOglasiList, setmojiOglasiList] = useState([]);
  const [imaOglasa, setImaOglasa] = useState(false)

  const doniraniOglasi=[]
  const mojiOglasi=[]

  useEffect(() => {

    setIme(JSON.parse(localStorage.getItem("user")).userName);
    setPrezime(JSON.parse(localStorage.getItem("user")).userSurname);
    setMjesto(JSON.parse(localStorage.getItem("user")).userLocation);
    setEmail(JSON.parse(localStorage.getItem("user")).email);
    setPass(JSON.parse(localStorage.getItem("user")).password);
    setDonate(JSON.parse(localStorage.getItem("user")).canDonate);
    setSentMail(JSON.parse(localStorage.getItem("user")).mailSent);


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
        var mapa=response.data
        setDonacije(response.data)
        for (const obj of mapa){
          // console.log(obj)
          if (obj.donatedToUser!=null){
            doniraniOglasi.push(obj);
          }
          else {
            mojiOglasi.push(obj)
          }
        }
        setdoniraniOglasiList(doniraniOglasi)
        setmojiOglasiList(mojiOglasi)
      })
      .catch((err) => {
        console.log(err)
      });

  },[email]);

  if (donacije.length==0){
    console.log("Nema oglasa")
    return <div className={MojiOglasiCSS.nevidljiv}>Nema oglasa</div>
  }
  else {
    return (
      <>
        <div className={MojiOglasiCSS.okvir}>
        <h2>Donirane donacije</h2>
          <div className={MojiOglasiCSS.karticaList} style={{display:doniraniOglasiList.length==0 ?"none":""}}>
              {doniraniOglasiList.map((donacija) => {
              return <MojaDonacijaKard key={donacija.idDonation} donacija={donacija}></MojaDonacijaKard>;
              })}
          </div>
        </div>

        <div className={MojiOglasiCSS.okvir}>
        <h2>Moje trenutne donacije</h2>
          <div className={MojiOglasiCSS.karticaList} style={{display:mojiOglasiList.length==0 ?"none":""}}>
              {mojiOglasiList.map((donacija) => {
              return <MojaDonacijaKard key={donacija.idDonation} donacija={donacija}></MojaDonacijaKard>;
              })}
          </div>
        </div>
    </>
    );
    }
}
export default MojeDonacije;