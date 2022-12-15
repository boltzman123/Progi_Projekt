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
    const [imeErr, setImeErr] = useState('');
    const [prezime, setPrezime] = useState('');
    const [prezimeErr, setPrezimeErr] = useState('');
    const [mjesto, setMjesto] = useState('');
    const [mjestoErr, setMjestoErr] = useState('');
    const [email, setEmail] = useState('');
    const [emailErr, setEmailErr] = useState('');
    const [pass, setPass] = useState('');
    const [passErr, setPassErr] = useState('');

    const hasErrs = () => {
        if (imeErr || prezimeErr || mjestoErr || emailErr || passErr) 
          return true
        return false
      }
    
      const notFilled = () => {
        if (!ime || !prezime || !mjesto || !email || !pass)
          return true
        return false
      }

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
                        className={imeErr ? `${RegForm.inputFrame} ${RegForm.inputFrameErr}` : RegForm.inputFrame}
                        onChange={ (e) => setIme(e.target.value)}
                        onBlur={() => {
                            if (!ime) {
                                setImeErr("Ime mora biti upisano.")
                            } else if (ime.length < 3){
                                setImeErr("Ime mora biti dulje od 2 znaka.")
                            } else {
                                setImeErr("")
                            }
                        }}
                    />
                </div>
                <div className={RegForm.errorMessage} style={{display: imeErr ? 'block' : 'none' }}>{imeErr}</div>
                <div className={RegForm.frame}>
                    <input 
                        value={prezime} type="text" name="prezime" id="prezime" 
                        placeholder="Perić" className={prezimeErr ? `${RegForm.inputFrame} ${RegForm.inputFrameErr}` : RegForm.inputFrame}
                        onChange={ (e) => setPrezime(e.target.value)}
                        onBlur={() => {
                            if (!prezime) {
                                setPrezimeErr("Prezime mora biti upisano.")
                            } else if (prezime.length < 3){
                                setPrezimeErr("Prezime mora biti dulje od 2 znaka.")
                            } else {
                                setPrezimeErr("")
                            }
                        }}
                    />
                </div>
                <div className={RegForm.errorMessage} style={{display: prezimeErr ? 'block' : 'none' }}>{prezimeErr}</div>
                <div className={RegForm.frame}>
                    <input 
                        value={mjesto} type="text" name="mjesto" id="mjesto" 
                        placeholder="Ulica Perića, Perkovci" className={mjestoErr ? `${RegForm.inputFrame} ${RegForm.inputFrameErr}` : RegForm.inputFrame}
                        onChange={ (e) => setMjesto(e.target.value)}
                        onBlur={() => {
                            if (!mjesto) {
                                setMjestoErr("Naziv mjesta mora biti upisan.")
                            } else if (mjesto.length < 4){
                                setMjestoErr("Naziv mjesta mora biti dulji od 3 znaka.")
                            } else {
                                setMjestoErr("")
                            }
                        }}
                    />
                </div>
                <div className={RegForm.errorMessage} style={{display: mjestoErr ? 'block' : 'none' }}>{mjestoErr}</div>
                <div className={RegForm.frame}>
                    <FiMail className="icon" style={{marginTop: emailErr ? '20px' : '1px', marginRight: emailErr ? '-1px': '0px'}}></FiMail>
                    <input 
                        value={email} type="email" name="email" id="email" 
                        placeholder="peroperic@email.com" className={emailErr ? `${RegForm.inputFrame} ${RegForm.inputFrameErr}` : RegForm.inputFrame}
                        onChange={ (e) => setEmail(e.target.value)}
                        onBlur={() => {
                            if (!email) {
                                setEmailErr("Email adresa mora biti upisana.")
                            } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))) {
                                setEmailErr("Email adresa mora biti ispravno formatirana.")
                            } else {
                                setEmailErr("")
                            }
                        }}
                    />    
                </div>
                <div className={RegForm.errorMessage} style={{display: emailErr ? 'block' : 'none' }}>{emailErr}</div>
                <div className={RegForm.frame}>
                    <FiLock className="icon" style={{marginTop: passErr ? '20px' : '1px', marginRight: passErr ? '-1px': '0px'}}></FiLock>
                    <input 
                        value={pass} type="password" name="pass" id="pass" 
                        placeholder="Lozinka" 
                        className={passErr ? `${RegForm.inputFrame} ${RegForm.inputFrameErr}` : RegForm.inputFrame}
                        onChange={ (e) => setPass(e.target.value)}
                        onBlur={() => {
                            if (!pass) {
                              setPassErr("Lozinka mora biti upisana.")
                            } else if (pass.length < 3){
                              setPassErr("Lozinka mora biti dulja od 2 znaka.")
                            } else {
                              setPassErr("")
                            }
                          }}
                    />    
                </div>
                <div className={RegForm.errorMessage} style={{display: passErr ? 'block' : 'none' }}>{passErr}</div>
                <div className='frame buttonFrame' style={{marginLeft: '35px'}}>
                    <button type='submit' className='gumbic tamniji buttonreg' disabled={hasErrs() || notFilled()}>Registriraj se</button>
                    <Link to={"/login"}>
                        <button className="gumbic upitnik buttonreg">Već imaš profil?</button>{" "}
                    </Link>
                </div>
            </form>
        </React.Fragment>
    );
}
 
export default RegistracijaForm;