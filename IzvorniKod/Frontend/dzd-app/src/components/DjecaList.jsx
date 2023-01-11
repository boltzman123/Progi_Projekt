import React, { useState, useEffect } from 'react';
import axios from "axios";
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { Typography, Accordion, AccordionSummary, AccordionDetails, Checkbox, IconButton} from '@mui/material';
import { List, ListItem, ListItemText, ListItemButton, ListItemIcon, Container} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DijeteEditModal from './DijeteEditModal';


const DjecaList = ({updatePage, setUpdatePage}) => {
    const [user, setUser] = useState();
    const [djeca, setDjeca] = useState([]);


    useEffect(() => {
        let user_tmp = JSON.parse(localStorage.getItem('user'));
        setUser(user_tmp);
    }, [])

    useEffect(() => {
        if (user !== undefined){
            getAllChildren();
        };
    }, [user, updatePage])

    const getAllChildren = () => {
        axios({
            method: "get",
            url:`/api/child/${user.email}`,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
        }).then((response) =>{
            setDjeca(response.data)
        });
    };

    const editChild = (dijete) => () => {
        console.log('Edit: ' + dijete);
    };

    const deleteChild = (dijete) => () => {
        axios({
            method: "delete",
            url:'/api/child/',
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            data: dijete
        }).then((response) =>{
            getAllChildren();
        }).catch(err => {
            console.log(err)
            toast.error("Neispravno uneseni podaci");
        });
    }


    return(
        <React.Fragment>
            <Container maxWidth='xs'>
                <List>
                    {djeca.map((dijete) => {
                        return(
                            <ListItem 
                                key={"dijete " + dijete.childId}
                            >
                                <ListItemText  key={"dijete tekst " + dijete.childId} primary={`${dijete.childName}`}/>
                                <DijeteEditModal key={"modal dijete " + dijete.childId} dijete={dijete} updatePage={updatePage} setUpdatePage={setUpdatePage}>
                                </DijeteEditModal>
                                <IconButton key={"dijete button delete " + dijete.childId}onClick={deleteChild(dijete)}>
                                        <RemoveCircleIcon/>
                                </IconButton>
                            </ListItem>
                        );
                    })}
                </List>
            </Container>
        </React.Fragment>
    );
}
export default DjecaList;