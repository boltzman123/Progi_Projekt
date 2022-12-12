import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Select } from '@mui/material'; 

import Dropdown from "react-dropdown";

import RegForm from "../style/components/RegistracijaForm.module.css"
import "../style/components/Buttons.css";

import { toast } from 'react-toastify';

const OldNovoDijeteForm = () => {
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
            <form>
                
            </form>
        </React.Fragment>
    );
}
 
export default OldNovoDijeteForm;