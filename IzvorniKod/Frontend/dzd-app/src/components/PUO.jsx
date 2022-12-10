import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import RegForm from "../style/components/RegistracijaForm.module.css"
import "../style/components/Buttons.css";

import { FiMail } from "react-icons/fi";
import { toast } from 'react-toastify';

// PUO je Pregledaj, Uredi, Obrisi

const User = () => {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [mjesto, setMjesto] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    useEffect(() => {
      setIme(JSON.parse(localStorage.getItem("user")).userName);
      setPrezime(JSON.parse(localStorage.getItem("user")).userSurname);
      setMjesto(JSON.parse(localStorage.getItem("user")).userLocation);
      setEmail(JSON.parse(localStorage.getItem("user")).email);
      setPass(JSON.parse(localStorage.getItem("user")).password);
    }, []);
    
    const navigate=useNavigate();

    const logOff= ()=> {
      console.log("Odlogiravam te")
      localStorage.clear()
      navigate("/")
    }

    const obrisiRacun = () => {
      console.log("Brisem racun")

        axios({
            method: 'delete',
            url: `/api/users/${email}`,
            headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        }).then((response) => {
            console.log(response.data);
            console.log("Korisnik je obrisan")
            localStorage.clear()
            navigate('/');
          })
          .catch(err => {
            console.log(err)
            toast.error("Došlo je do greške")
        });
    }

    const onSubmit = () =>{
      console.log("Updateam podatke")

        axios({
            method: 'put',
            url: `/api/users/${email}`,
            headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
            data:{
                userName: ime,
                userSurname: prezime,
                userLocation: mjesto,
                email: email,
                password: pass
          }
        }).then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data))
            console.log(response.data);
          })
          .catch(err => {
            console.log(err)
            toast.error("Došlo je do greške")
        });
    }

    return ( 
        <React.Fragment>
          Pregledaj i/ili uredi svoje podatke
            <form>
                <div className={RegForm.frame}>
                    <input 
                        value={ime}
                        type="text"
                        name="ime" id="ime" 
                        className={RegForm.inputFrame}
                        minLength={3}
                        onChange={ (e) => setIme(e.target.value)}
                    />
                </div>
                <div className={RegForm.frame}>
                    <input 
                        value={prezime}  
                        type="text" name="prezime" id="prezime" 
                        className={RegForm.inputFrame}
                        minLength={3} 
                        onChange={ (e) => setPrezime(e.target.value)}
                    />
                </div>
                <div className={RegForm.frame}>
                    <input 
                        value={mjesto}
                        type="text" name="mjesto" id="mjesto" 
                        className={RegForm.inputFrame}
                        minLength={4} 
                        onChange={ (e) => setMjesto(e.target.value)}
                    />
                </div>
                <div className={RegForm.frame}>
                    <FiMail className="icon"></FiMail>
                    <input disabled
                        value={email} 
                        type="email" name="email" id="email" 
                        placeholder={JSON.parse(localStorage.getItem("user")).email}
                        className={RegForm.inputFrame}
                    />    
                </div>
                </form>
                <div className={`${RegForm.frame} ${RegForm.buttonFrame}`}>
                    <button className='gumbic tamniji buttonreg' onClick={() => { if (window.confirm('Provjerite jeste li sve dobro upisali')) onSubmit() } }>Updateaj podatke</button>
                    <button className="gumbic upitnik buttonreg" onClick={() => { if (window.confirm('Sigurno želite obrisati račun?')) obrisiRacun() }}>Obrisi racun</button>{" "}
                    <button className="gumbic upitnik buttonreg" onClick={() => { if (window.confirm('Sigurno se želiš odlogirati?')) logOff() }}>Log out</button>{" "}
                </div>
            
        </React.Fragment>
    );
}
 
export default User;