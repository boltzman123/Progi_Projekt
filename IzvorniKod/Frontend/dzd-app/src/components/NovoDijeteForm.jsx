import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TextField, Select, Button, FormControl, FormLabel, Typography} from '@mui/material';
import { RadioGroup, FormControlLabel, Radio, Grid, InputLabel, MenuItem, Box, Container } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import NovoDijeteCategoryPicker from './NovoDijeteCategoryPicker.jsx'

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
            console.log("Dodano dijete");
            clearForm();
            setUpdatePage(Math.random());
            navigate('/djeca');
          })
          .catch(err => {
            console.log('Forma ne šljaka')
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
                <Container maxWidth='xs'>
                    <Box>
                        <TextField
                            label="Ime" 
                            id="ime" 
                            value={ime} 
                            required
                            variant="outlined" 
                            fullWidth
                            onChange={(e) => setIme(e.target.value)}/>

                        <FormControl fullWidth>
                            <FormLabel id="spol">Spol</FormLabel>
                            <RadioGroup
                                name="spol-radio-buttons-group"
                                value={spol}
                                required
                                onChange={(e) => setSpol(e.target.value)}
                            >
                                <FormControlLabel value="z" control={<Radio />} label="Žensko" />
                                <FormControlLabel value="m" control={<Radio />} label="Muško" />
                            </RadioGroup>
                        </FormControl>
                   
                        <FormControl fullWidth>
                            <InputLabel>Dob</InputLabel>
                            <Select
                                labelId="dob-select-label"
                                id="dob-select"
                                value={dob}
                                label="Dob"
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
                        
                        {dob == 0 ?
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                label="Očekivan datum rođenja"
                                value={expBirthDate}
                                inputFormat="dd/MM/yyyy"
                                onChange={(newDate) => {setExpBirthDate(newDate);
                                }}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </LocalizationProvider>
                        :<></>
                        }
                        
                        <Box>
                            <Typography/>
                        </Box>
                        <NovoDijeteCategoryPicker 
                            checkedSub={checkedSub} setCheckedSub={setCheckedSub}
                            categories={categories} setCategories={setCategories}
                            subcategories={subcategories} setSubCategories={setSubCategories}/>
                        <Button type="submit">Dodaj</Button>
                        <Button onClick={ clearForm }>Clear</Button>
                    </Box>
                </Container>
            </form>
    );
}

export default NovoDijeteForm;