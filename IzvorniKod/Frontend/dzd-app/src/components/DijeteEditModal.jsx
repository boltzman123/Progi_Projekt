import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


import { TextField, Select, Button, FormControl, FormLabel, Typography} from '@mui/material';
import { RadioGroup, FormControlLabel, Radio, Grid, InputLabel, MenuItem, Box, Container } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import NovoDijeteCategoryPicker from './NovoDijeteCategoryPicker.jsx'
import { Modal, IconButton} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit';

import ndfCSS from "../style/components/NovoDijeteForm.module.css";


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

const DijeteModal = ({dijete, updatePage, setUpdatePage}) => {
    const [ime, setIme] = useState('');
    const [spol, setSpol] = useState('');
    const [dob, setDob] = useState(0);
    const [expBirthDate, setExpBirthDate] = useState(new Date());

    const [checkedSub, setCheckedSub] = useState([]);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);

    const [sendCategories, setSendCategories] = useState([]);
    const [sendSubCategories, setSendSubCategories] = useState([]);
    
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const ageRange = [...Array(16).keys()];

    const navigate=useNavigate();

    useEffect(() => {
        setIme(dijete.childName);
        setSpol(dijete.childSex);
        setDob(dijete.childAge);
        setExpBirthDate(dijete.predictedBirthDate);
        setCheckedSub(dijete.subcategory.map((sub) => (sub.subcategoryName)));

    }, []);
    
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
        console.log('newSubcats: ', sendsubcat);                   
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
        console.log('newCats: ', sendcat);                   
        setSendCategories(sendcat);
        
        axios({
            method: 'put',
            url: `/api/child/${user.email}/${dijete.childId}`,
            headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
            data:{
                "childId": dijete.childId,
                "childName": ime,
                "childSex": spol,
                "childAge": dob,
                "predictedBirthDate": expBirthDate,
                "user":user,
                "category":sendcat,
                "subcategory":sendsubcat

          }
        }).then((response) => {
            console.log("Updateano dijete");
            handleClose();
            setUpdatePage(Math.random());
            navigate('/djeca');
          })
          .catch(err => {
            console.log('Forma ne šljaka')
            toast.error("Neispravno uneseni podaci")
        });
    }


    return (
        <React.Fragment>
            <IconButton onClick={handleOpen}>
                <EditIcon/>
            </IconButton> 
            <Modal
                open={open}
                onClose={handleClose}>
                <Box className={ndfCSS.modal}sx={{...style, width: 340, maxHeight: 480, overflow: 'auto'}}>
                    <form onSubmit={ onSubmit }>
                        <Container maxWidth='xs'>
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
                                            className={ndfCSS.item}
                                        >
                                            <FormControlLabel value="z" control={<Radio />} label="Žensko" />
                                            <FormControlLabel value="m" control={<Radio />} label="Muško" />
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
                                <Button type="submit" variant='contained' sx={{borderRadius: 20}} size='large'>Update</Button>

                            </Box>
                        </Container>
                    </form>
                </Box>
            </Modal>
        </React.Fragment>  
    );
}
 
export default DijeteModal;