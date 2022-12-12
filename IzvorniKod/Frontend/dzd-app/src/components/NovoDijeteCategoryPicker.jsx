import React, { useState, useEffect } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const NovoDijeteCategoryPicker = () => {


    const [categories, setCategories] = useState([]);
    const [subcategories, setSubCategories] = useState([]);
    
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

    


    return(
        <React.Fragment>
            
            {categories.map((cat) => {
                console.log(cat.categoryName);
                return(
                <Accordion>
                    <AccordionSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{cat.categoryName}</Typography>
                    </AccordionSummary>
                    <AccordionDetails>

                    </AccordionDetails>
                </Accordion>);
            })}
            
            
        </React.Fragment>
    );
}
export default NovoDijeteCategoryPicker;