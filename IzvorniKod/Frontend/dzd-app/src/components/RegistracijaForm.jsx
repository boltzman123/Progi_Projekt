import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import "../style/components/RegistracijaForm.css";
import "../style/components/Buttons.css";

import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

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
            navigate('/base');
          })
          .catch(err => console.log(err));
    }

    return ( 
        <React.Fragment>
            <form onSubmit={ onSubmit }>
                <div className='frameReg'>
                    <input 
                        value={ime}
                        type="text"
                        name="ime" id="ime" 
                        placeholder="Pero"
                        className='inputFrameReg'
                        minLength={3}
                        required={true}
                        onChange={ (e) => setIme(e.target.value)}
                    />
                </div>
                <div className='frameReg'>
                    <input 
                        value={prezime} type="text" name="prezime" id="prezime" 
                        placeholder="Perić" className='inputFrameReg'
                        minLength={3} required={true}
                        onChange={ (e) => setPrezime(e.target.value)}
                    />
                </div>
                <div className='frameReg'>
                    <input 
                        value={mjesto} type="text" name="mjesto" id="mjesto" 
                        placeholder="Ulica Perića, Perkovci" className='inputFrameReg'
                        minLength={4} required={true}
                        onChange={ (e) => setMjesto(e.target.value)}
                    />
                </div>
                <div className='frameReg'>
                    <FiMail className="icon"></FiMail>
                    <input 
                        value={email} type="email" name="email" id="email" 
                        placeholder="peroperic@email.com" className='inputFrameReg'
                        minLength={3} required={true}
                        onChange={ (e) => setEmail(e.target.value)}
                    />    
                </div>
                <div className='frameReg'>
                    <FiLock className="icon"></FiLock>
                    <input 
                        value={pass} type="password" name="pass" id="pass"  
                        className='inputFrameReg'
                        minLength={3} required={true}
                        onChange={ (e) => setPass(e.target.value)}
                    />    
                </div>
                <div className='frameReg buttonFrameReg'>
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