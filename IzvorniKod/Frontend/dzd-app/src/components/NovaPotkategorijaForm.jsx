import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TextField, Select, Button, FormControl, FormLabel, Typography} from '@mui/material';
import { RadioGroup, FormControlLabel, Radio, Grid, InputLabel, MenuItem, Box, Container } from '@mui/material';
import { List, ListItem, ListSubheader, ListItemText, ListItemButton, ListItemIcon} from '@mui/material';

const NovaPotkategorijaForm = ({updatePage, setUpdatePage}) => {
    const [categories, setCategories] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [subcategoryName, setSubcategoryName] = useState("");
    const [checkedCat, setCheckedCat] = useState("");
    const [checkedSeason, setCheckedSeason] = useState("");
    const [useDateExpires, setUseDateExpires] = useState(0);

    const navigate=useNavigate();

    useEffect(() => {
        axios({
            method: "get",
            url: '/api/category',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
        }).then((response) =>{
            setCategories(response.data)
        })

        axios({
            method: "get",
            url: '/api/subcategory/seasons',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
        }).then((response) =>{
            const newSeasons = [...response.data];
            newSeasons.push("ALL");
            setSeasons(newSeasons);
        })
    }, [updatePage])

    const onSubmit = (e) => {
        e.preventDefault();

        axios({
            method: 'post',
            url: '/api/subcategory',
            headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
            data:{
                subcategoryName: subcategoryName,
                category: {
                    categoryName: checkedCat
                },
                useDateExpires: useDateExpires,
                season: checkedSeason
            },
            auth: {
                username: "admin",
                password: "pass"
            }
        }).then((response) => {
            console.log("Dodana potkategorija");
            clearForm();
            setUpdatePage(Math.random());
            navigate('/kategorije');
          })
          .catch(err => {
            console.log(err)
            toast.error("Neispravno uneseni podaci")
        });
    }

    const clearForm = () => {
        setSubcategoryName("");
        setCheckedCat("");
        setCheckedSeason("");
        setUseDateExpires(0);
    }

    return (  
        <form onSubmit={onSubmit}>
            <Container maxWidth='xs'>
                <Box>
                    <TextField
                            label="Ime potkategorije" 
                            id="imePodKategorije" 
                            value={subcategoryName} 
                            required
                            variant="outlined" 
                            fullWidth
                            onChange={(e) => setSubcategoryName(e.target.value)}/>


                    <RadioGroup
                        name="kategorije-radio-buttons-group"
                        value={checkedCat}
                        required
                        
                        onChange={(e) => setCheckedCat(e.target.value)}
                        style={{maxHeight: 250, overflow: 'auto'}}
                    >
                        
                        <List
                            variant="outlined"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Kategorije
                                </ListSubheader>}
                        >
                            {categories.map((cat) => {
                                            return(
                                                <ListItem key={"kategorija item" + cat.categoryName}>
                                                    <FormControlLabel value={`${cat.categoryName}`}control={<Radio />} label={`${cat.categoryName}`} />
                                                </ListItem>
                                            );
                            })}
                        </List>
                    </RadioGroup>


                    <RadioGroup
                        name="sezone-radio-buttons-group"
                        value={checkedSeason}
                        required
                        
                        onChange={(e) => setCheckedSeason(e.target.value)}
                        style={{maxHeight: 150, overflow: 'auto'}}
                    >
                        
                        <List
                            variant="outlined"
                            subheader={
                                <ListSubheader component="div" id="nested-list-subheader">
                                    Sezone
                                </ListSubheader>}
                        >
                            {seasons.map((season) => {
                                            return(
                                                <ListItem key={"season item" + season}>
                                                    <FormControlLabel value={`${season}`}control={<Radio />} label={`${season}`} />
                                                </ListItem>
                                            );
                            })}
                        </List>
                    </RadioGroup>

                    <TextField
                        name="itemDuration" 
                        value={useDateExpires}
                        onChange={(e) => setUseDateExpires(e.target.value)}
                        type="number"
                        InputProps={{
                            inputProps: { 
                                max: 10, min: 0, step: 0.5 
                            }
                        }}
                        label="Trajanje"
                    />
                    <Button type="submit">Dodaj potkategoriju</Button>
                </Box>
            </Container>
        </form>
    );
}
 
export default NovaPotkategorijaForm;