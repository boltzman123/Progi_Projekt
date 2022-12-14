import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, Box } from '@mui/material';
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NovoDijeteCategoryPicker = ({checkedSub, setCheckedSub,
                                  categories, setCategories, 
                                  subcategories, setSubCategories}) => {
    
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
            url: '/api/subcategory',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
        }).then((response) =>{
            setSubCategories(response.data)
        })
        


    }, [])

    const checkToggle = (subcategory) => () => {
        const currentIndex = checkedSub.indexOf(subcategory);
        const newChecked = [...checkedSub];

        if (currentIndex === -1) {
        newChecked.push(subcategory);
        } else {
        newChecked.splice(currentIndex, 1);
        }
        
        console.log(newChecked);
        setCheckedSub(newChecked);
    };

    return(
        // Error - list itemi moraju imat key
        // Pokusao sam sve - no error ne odlazi
        <React.Fragment>
            <Box>          
                {categories.map((category) => {
                    return(
                    <Accordion key={category.categoryName}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>{category.categoryName}</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{maxHeight: 150, overflow: 'auto'}}>
                            <List>
                                {subcategories.map((subcategory) => {
                                    return(
                                        category.categoryName === subcategory.category.categoryName ?
                                        <ListItem key={category.categoryName + subcategory.subcategoryName}>
                                            <ListItemButton onClick={checkToggle(subcategory.subcategoryName)}>
                                                <ListItemIcon>
                                                    <Checkbox checked={checkedSub.indexOf(subcategory.subcategoryName) !== -1}/>
                                                </ListItemIcon>
                                                <ListItemText primary={`${subcategory.subcategoryName}`}/>
                                            </ListItemButton>
                                        </ListItem>
                                        :<></>
                                    );
                                })}
                            </List>
                        </AccordionDetails>
                    </Accordion>);
                })}
            </Box>
        </React.Fragment>
    );
}
export default NovoDijeteCategoryPicker;