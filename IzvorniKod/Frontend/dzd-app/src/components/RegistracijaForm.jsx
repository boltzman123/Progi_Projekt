import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import RegForm from "../style/components/RegistracijaForm.module.css"
import "../style/components/Buttons.css";

import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

const RegistracijaForm = () => {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [mjesto, setMjesto] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const navigate=useNavigate();

    const onSubmit = (e) =>{
        e.preventDefault();

        axios({
            method: 'post',
            url: '/api/users/',
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
            console.log(response.data);
            navigate('/login');
          })
          .catch(err => {
            console.log(err)
            toast.error("Već postoji korisnik sa tom email adresom")
        });
    }

    return ( 
        <React.Fragment>
            <form onSubmit={ onSubmit }>
                <div className={RegForm.frame}>
                    <input 
                        value={ime}
                        type="text"
                        name="ime" id="ime" 
                        placeholder="Pero"
                        className={RegForm.inputFrame}
                        minLength={3}
                        required={true}
                        onChange={ (e) => setIme(e.target.value)}
                    />
                </div>
                <div className={RegForm.frame}>
                    <input 
                        value={prezime} type="text" name="prezime" id="prezime" 
                        placeholder="Perić" className={RegForm.inputFrame}
                        minLength={3} required={true}
                        onChange={ (e) => setPrezime(e.target.value)}
                    />
                </div>
                <div className={RegForm.frame}>
                    <input 
                        value={mjesto} type="text" name="mjesto" id="mjesto" 
                        placeholder="Ulica Perića, Perkovci" className={RegForm.inputFrame}
                        minLength={4} required={true}
                        onChange={ (e) => setMjesto(e.target.value)}
                    />
                </div>
                <div className={RegForm.frame}>
                    <FiMail className="icon"></FiMail>
                    <input 
                        value={email} type="email" name="email" id="email" 
                        placeholder="peroperic@email.com" className={RegForm.inputFrame}
                        minLength={3} required={true}
                        onChange={ (e) => setEmail(e.target.value)}
                    />    
                </div>
                <div className={RegForm.frame}>
                    <FiLock className="icon"></FiLock>
                    <input 
                        value={pass} type="password" name="pass" id="pass"  
                        className={RegForm.inputFrame}
                        minLength={3} required={true}
                        onChange={ (e) => setPass(e.target.value)}
                    />    
                </div>
                <div className='frame buttonFrame'>
                    <button type='submit' className='gumbic tamniji buttonreg'>Registriraj se</button>
                    <Link to={"/login"}>
                        <button className="gumbic upitnik buttonreg">Već imaš profil?</button>{" "}
                    </Link>
                </div>
            </form>
        </React.Fragment>
    );
}
 
export default RegistracijaForm;