import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Stack } from '@mui/material/Stack';
import { TextField, Select, Button, FormControl, FormLabel} from '@mui/material';
import { RadioGroup, FormControlLabel, Radio, Grid, InputLabel, MenuItem, Box, Container } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

import NovoDijeteCategoryPicker from './NovoDijeteCategoryPicker.jsx'

const NovoDijeteForm = () => {
    const [ime, setIme] = useState('');
    const [spol, setSpol] = useState('');
    const [dob, setDob] = useState(0);
    const [expBirthDate, setExpBirthDate] = useState(null);
    const navigate=useNavigate();

    const ageRange = [...Array(15).keys()];

    let user = JSON.parse(localStorage.getItem('user'))

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(ime)
        console.log(spol)
        console.log(dob)
        console.log(expBirthDate)
        console.log(expBirthDate.toJSON())
        
        


        {/* Treba popraviti ove metode, urlove i sve ostalo 
        
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
        */}
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
                        
                        <NovoDijeteCategoryPicker/>

                        <Button type="submit">Dodaj</Button>

                    </Box>
                </Container>
            </form>
    );
}

export default NovoDijeteForm;