import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TextField, Select, Button, FormControl, FormLabel, Typography} from '@mui/material';
import { RadioGroup, FormControlLabel, Radio, Grid, InputLabel, MenuItem, Box, Container } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import NovoDijeteCategoryPicker from './NovoDijeteCategoryPicker.jsx'

import ndfCSS from "../style/components/NovoDijeteForm.module.css";



const NovoDijeteForm = ({updatePage, setUpdatePage}) => {
    const [ime, setIme] = useState('');
    const [spol, setSpol] = useState('');
    const [dob, setDob] = useState(0);
    const [expBirthDate, setExpBirthDate] = useState(new Date());

    const [checkedSub, setCheckedSub] = useState([]);
    //const [checkedCat, setCheckedCat] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    const [sendCategories, setSendCategories] = useState([]);
    const [sendSubCategories, setSendSubCategories] = useState([]);

    const navigate=useNavigate();

    const ageRange = [...Array(16).keys()];

    let user = JSON.parse(localStorage.getItem('user'))

    const onSubmit = (e) =>{
        e.preventDefault();

        // Dohvaćanje user objekta iz local storage-a
        const user = JSON.parse(localStorage.getItem('user'))

        // Kreiranje arraya (koji je zapravo skup) kategorija
        let checkedCat = new Set()
        // Kreiranje arraya subcategory objekata
        let sendsubcat = [];
        checkedSub.forEach((cS) => { 
            subcategories.forEach((sub) => {
                if (sub.subcategoryName === cS){
                    // Dodavanje kategorije u skup
                    checkedCat.add(sub.category.categoryName);
                    // Dodavanje subcategory objekta u array   
                    sendsubcat.push(sub);
                };
            });
            
        })                   
        setSendSubCategories(sendsubcat);

        // Kreiranje arraya category objekata iz prethodno definiranog skupa
        let sendcat = []
        checkedCat.forEach((cC) => {
            categories.forEach((cat) => {
                if (cat.categoryName === cC){
                    sendcat.push(cat)
                }
            })
        })
        setSendCategories(sendcat);
        
        axios({
            method: 'post',
            url: '/api/child/',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
            data:{
                "childName": ime,
                "childSex": spol,
                "childAge": dob,
                "predictedBirthDate": expBirthDate,
                "user":user,
                "category":sendcat,
                "subcategory":sendsubcat

          }
        }).then((response) => {
            clearForm();
            setUpdatePage(Math.random());
            toast.success("Uspješno kreirano dijete")
          })
          .catch(err => {
            console.log(err)
            toast.error("Neispravno uneseni podaci")
        });
        
    }

    const clearForm = () => {
        setIme('');
        setSpol('');
        setDob(0);
        setExpBirthDate(new Date());
        setCheckedSub([]);
    }

    return(
            <form onSubmit={ onSubmit }>
                <Container maxWidth='xs' className={ndfCSS.container}>
                    <Box>
                        <Box className={ndfCSS.FormControl}>
                            <Typography>Ime</Typography>
                            <TextField
                                id="ime" 
                                value={ime} 
                                required
                                variant="outlined" 
                                fullWidth
                                onChange={(e) => setIme(e.target.value)}
                                className={ndfCSS.item}/>
                        </Box>
                        
                        <Box className={ndfCSS.FormControl}>
                            <Typography>Spol</Typography>
                            <FormControl fullWidth>
                                <RadioGroup
                                    name="spol-radio-buttons-group"
                                    value={spol}
                                    required
                                    onChange={(e) => setSpol(e.target.value)}
                                >
                                    <FormControlLabel className={ndfCSS.item} value="z" control={<Radio />} label="Žensko" />
                                    <FormControlLabel className={ndfCSS.item} value="m" control={<Radio />} label="Muško" />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                   
                        <Box className={ndfCSS.FormControl}>
                            <Typography>Dob</Typography>
                            <FormControl fullWidth>
                                <Select
                                    labelId="dob-select-label"
                                    id="dob-select"
                                    value={dob}
                                    className={ndfCSS.item}
                                    required
                                    MenuProps={{
                                        PaperProps: { sx: { maxHeight: 175 }}
                                    }}
                                    onChange={(e) => setDob(e.target.value)}>
                                    {ageRange.map((ageSelect) => {
                                        return <MenuItem key={ageSelect} value={ageSelect}>{ageSelect}</MenuItem>
                                    })}
                                </Select>
                            </FormControl>
                        </Box>
                        
                        {dob == 0 ?
                        <Box className={ndfCSS.FormControl}>
                            <Typography>Očekivani datum rođenja</Typography>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={expBirthDate}
                                    className={ndfCSS.item}
                                    inputFormat="dd/MM/yyyy"
                                    onChange={(newDate) => {setExpBirthDate(newDate);
                                    }}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                            </LocalizationProvider>
                        </Box>
                        :<></>
                        }
                        
                        <Box className={ndfCSS.FormControl}>
                            <Typography>Odabrane kategorije</Typography>
                            <NovoDijeteCategoryPicker 
                                checkedSub={checkedSub} setCheckedSub={setCheckedSub}
                                categories={categories} setCategories={setCategories}
                                subcategories={subcategories} setSubCategories={setSubCategories}/>
                        </Box>
                        
                        <Box className={ndfCSS.buttonbox}>
                            <Button type="submit" variant='contained' sx={{borderRadius: 20, m: 5}} size='large'>Dodaj</Button>
                            <Button onClick={ clearForm } variant='contained' sx={{borderRadius: 20, m: 5}} size='large'>Clear</Button>
                        </Box>
                    </Box>
                </Container>
            </form>
    );
}

export default NovoDijeteForm;