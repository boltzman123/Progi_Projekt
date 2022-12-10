import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import RegForm from "../style/components/RegistracijaForm.module.css"
import "../style/components/Buttons.css";

import { toast } from 'react-toastify';

const NovoDijeteForm = () => {
    const [ime, setIme] = useState('');
    const [spol, setSpol] = useState('');
    const [dob, setDob] = useState('');
    const [expBirthDate, setExpBirthDate] = useState('');

    const navigate=useNavigate();

    const onSubmit = (e) =>{
        e.preventDefault();

        {/* Treba popraviti ove metode, urlove i sve ostalo */}
        
        axios({
            method: 'post',
            url: '/api/child/',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
            data:{
                childName: ime,
                childSex: spol,
                childAge: dob,
                predictedBirthDate: expBirthDate
          }
        }).then((response) => {
            console.log(response.data);
            navigate('/djeca');
          })
          .catch(err => {
            console.log(err)
            toast.error("Neispravno uneseni podaci")
        });
    }

    return ( 
        <React.Fragment>
            <form onSubmit={ onSubmit }>
                <div className={RegForm.frame}>
                    <input 
                        value={ime} type="text" name="ime" id="ime" 
                        placeholder="Perica" className={RegForm.inputFrame}
                        minLength={3} required={true}
                        onChange={ (e) => setIme(e.target.value)}
                    />
                </div>

                {/* Treba biti choice radio button M/F */}
                <div className={RegForm.frame}>
                    <input 
                        value={spol} type="radio" id="m" name="spol"
                        onChange={ (e) => setSpol(e.target.value)}
                    />
                    <label htmlFor="m">Muško</label><br/>
                    <input 
                        value={spol} type="radio" id="f" name="spol"
                        onChange={ (e) => setSpol(e.target.value)}
                    />
                    <label htmlFor="f">Žensko</label><br/>
                </div>

                {/* Neki onaj mali wheel sto scrolla po brojevima (max dob?) - 0 za nije se jos rodilo */}
                <div className={RegForm.frame}>
                    <input 
                        value={dob} type="number" name="dob" id="dob" 
                        className={RegForm.inputFrame}
                        min='0' max='15' required={true}
                        onChange={ (e) => setDob(e.target.value)}
                    />
                </div>
                {/* Treba postaviti age na 0 i onda se opva opcija prikazuje */}
                <div className={RegForm.frame}>
                    <input 
                        value={expBirthDate} type="date" name="expBirthDate" id="expBirthDate"  
                        className={RegForm.inputFrame}
                        min='2022-10-01' max='2028-10-01' required={true}
                        onChange={ (e) => setExpBirthDate(e.target.value)}
                    />    
                </div>

                <div className='frame buttonFrame'>
                    <button type='submit' className='gumbic tamniji buttonreg'>Dodaj dijete</button>
                </div>
            </form>
        </React.Fragment>
    );
}
 
export default NovoDijeteForm;