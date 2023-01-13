import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TextField, Button, Container, Typography, Box} from '@mui/material';

import nkpCSS from "../style/components/NovaKat-Potkat.module.css";


const NovaKategorijaForm = ({updatePage, setUpdatePage}) => {
    const [categoryName, setCategoryName] = useState("");

    const navigate=useNavigate();

    const onSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: '/api/category',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
            data:{
                categoryName:categoryName
            },
            auth: {
                username: "admin",
                password: "pass"
            }
        }).then((response) => {
            console.log("Dodana kategorija");
            toast.success("Uspješno ste nadodali novu kategoriju")
            clearForm();
            setUpdatePage(Math.random()*5);
            navigate('/kategorije');
          })
          .catch(err => {
            console.log(categoryName)
            console.log(err)
            toast.error("Neispravno uneseni podaci")
        });
    }

    const clearForm = () => {
        setCategoryName('');
    }

    return (
        <form onSubmit={onSubmit}>
            <Container maxWidth='xs' className={nkpCSS.container}>
                <Box className={nkpCSS.FormControl}>
                    <Typography>Naziv kategorije</Typography>
                    <TextField
                    id="imeKategorije" 
                    value={categoryName} 
                    required
                    variant="outlined" 
                    fullWidth
                    className={nkpCSS.item}
                    onChange={(e) => setCategoryName(e.target.value)}/>
                    <Button type="submit" variant='contained' sx={{borderRadius: 20, m: 5}} size='large'>Dodaj kategoriju</Button>
                </Box>
            </Container>
        </form>
    );
}
 
export default NovaKategorijaForm;