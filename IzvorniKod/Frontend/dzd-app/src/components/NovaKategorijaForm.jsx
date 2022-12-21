import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TextField, Button, Container} from '@mui/material';

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
            clearForm();
            setUpdatePage(Math.random());
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
            <Container maxWidth='xs'>
                <TextField
                label="Ime kategorije" 
                id="imeKategorije" 
                value={categoryName} 
                required
                variant="outlined" 
                fullWidth
                onChange={(e) => setCategoryName(e.target.value)}/>
                <Button type="submit">Dodaj kategoriju</Button>
            </Container>
        </form>
    );
}
 
export default NovaKategorijaForm;
