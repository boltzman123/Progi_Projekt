import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

import { TextField, Select, Button, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Grid, InputLabel, MenuItem} from '@mui/material';

import { toast } from 'react-toastify';

const NovoDijeteForm = () => {
    const [ime, setIme] = useState('');
    const [spol, setSpol] = useState('');
    const [dob, setDob] = useState('');
    const [expBirthDate, setExpBirthDate] = useState('');

    const navigate=useNavigate();

    const onSubmit = (e) =>{
        e.preventDefault();
        console.log(ime)
        console.log(spol)
        console.log(dob)

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
        <React.Fragment>
            <form onSubmit={ onSubmit }>
                <Grid container spacing={2}>
                    <Grid item>
                        <TextField id="ime" value={ime} label="Ime" variant="outlined" onChange={(e) => setIme(e.target.value)}/>
                    </Grid>

                    <Grid item>
                        <FormControl fullWidth>
                            <FormLabel id="spol">Spol</FormLabel>
                            <RadioGroup
                                name="spol-radio-buttons-group"
                                value={spol}
                                onChange={(e) => setSpol(e.target.value)}
                            >
                                <FormControlLabel value="z" control={<Radio />} label="Žensko" />
                                <FormControlLabel value="m" control={<Radio />} label="Muško" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    
                    <Grid item>
                        <FormControl fullWidth>
                            <InputLabel>Dob</InputLabel>
                            <Select
                                labelId="dob-select-label"
                                id="dob-select"
                                value={dob}
                                label="Dob"
                                onChange={(e) => setDob(e.target.value)}
                            >
                                {/* JS loop za 15 MenuItema */}
                                <MenuItem value={10}>Ten</MenuItem>
                                <MenuItem value={20}>Twenty</MenuItem>
                                <MenuItem value={30}>Thirty</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>



                    <Grid item>
                        <Button type="submit">Submit</Button>
                    </Grid>
                </Grid>
            </form>
        </React.Fragment>
    );
}

export default NovoDijeteForm;