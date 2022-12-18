import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, grid2Classes } from "@mui/material";
import DonacijaKardCSS from "../style/components/DonacijaKard.module.css";
import CardActions from "@mui/material/CardActions";

import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { Modal, IconButton } from "@mui/material";
import {
  TextField,
  Select,
  Button,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  InputLabel,
  MenuItem,
  Box,
  Container,
} from "@mui/material";

import NovoDijeteCategoryPicker from "./NovoDijeteCategoryPicker.jsx";

import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import DropdownCategory from "./DropdownCategory";
//`api/donation/${props.donacija.idDonation}`

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const DonacijaKard = (props) => {
  let { productName, forAge, itemState, productBrand, productionYear } =
    props.donacija.item;
  let { donationName, dateOfPublication, pictureURL } = props.donacija;
  let { userLocation } = props.donacija.user;
  let { user } = props.donacija.user;

  const ageRange = [...Array(16).keys()];
  const [dob, setDob] = useState(props.donacija.item.forAge);
  const [spol, setSpol] = useState(props.donacija.item.forSex);

  const [checkedCat, setCheckedCat] = useState(props.donacija.item.category);
  const [checkedSub, setCheckedSub] = useState(props.donacija.item.subcategory);
  //   console.log(props.donacija)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const onSubmit = (e) => {};
  console.log(props.donacija.item);
  return (
    <React.Fragment>
      <Card className={DonacijaKardCSS.malaKartica} variant="outlined">
        {/* OVDJE UPISI LINK KOJI VODI NA FULL PREGLED TOG PREDMETA */}
        <CardActionArea onClick={handleOpen}>
          <CardMedia
            className={DonacijaKardCSS.img}
            component="img"
            image={pictureURL}
            alt="slika predmeta koji se donira"
          />
          <h1
            style={{ color: "rgba(244, 177, 131, 255)", textAlign: "center" }}>
            {donationName}
          </h1>
          <CardContent sx={{ bgcolor: "#E8E8E8" }}>
            <h3>Ime predmeta: {productName}</h3>
            <h3>Predviđena dob korisnika: {forAge}</h3>
            <h3>Datum objave: {dateOfPublication} </h3>
            <h3>Lokacija: {userLocation} </h3>
          </CardContent>
        </CardActionArea>
      </Card>
      <Modal open={open} onClose={handleClose}>
        <Box
          className={DonacijaKardCSS.modal}
          sx={{ ...style, width: 1200, maxHeight: 1000, overflow: "auto" }}>
          <CardMedia
            className={DonacijaKardCSS.img}
            style={{ width: 800, height: 800 }}
            component="img"
            image={pictureURL}
            alt="slika predmeta koji se donira"
          />
          <form
            className={DonacijaKardCSS.predmeti}
            style={{ marginTop: 10 }}
            onSubmit={onSubmit}>
            <Container maxWidth="s">
              <Box>
                <TextField
                  label="Ime donacije"
                  id="ImeDonacije"
                  value={donationName}
                  disabled={true}></TextField>

                <TextField
                  label="Ime predmeta"
                  id="ImePredmeta"
                  value={productName}
                  disabled={true}></TextField>

                <TextField
                  label="Datum objave"
                  id="datumObjave"
                  value={dateOfPublication}
                  disabled={true}></TextField>

                <FormControl fullWidth>
                  <InputLabel>Predviđena dob:</InputLabel>
                  <Select
                    style={{ width: 225 }}
                    labelId="dob-select-label"
                    id="dob-select"
                    value={dob}
                    label="Dob"
                    required
                    disabled={true}
                    MenuProps={{
                      PaperProps: { sx: { maxHeight: 175 } },
                    }}
                    onChange={(e) => setDob(e.target.value)}>
                    {ageRange.map((ageSelect) => {
                      return (
                        <MenuItem key={ageSelect} value={ageSelect}>
                          {ageSelect}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel id="spol">Spol</FormLabel>
                  <RadioGroup
                    name="spol-radio-buttons-group"
                    value={spol}
                    required
                    onChange={(e) => setSpol(e.target.value)}>
                    <div>
                      <FormControlLabel
                        value="F"
                        disabled={true}
                        control={<Radio />}
                        label="Žensko"
                      />
                      <FormControlLabel
                        value="M"
                        disabled={true}
                        control={<Radio />}
                        label="Muško"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>

                <TextField
                  label="Stanje predmeta"
                  id="stanjePredmeta"
                  value={itemState}
                  disabled={true}></TextField>

                <TextField
                  label="Naziv marke predmeta"
                  id="markaPredmeta"
                  value={productBrand}
                  disabled={true}></TextField>

                <TextField
                  label="Godina proizvodnje"
                  id="godinaProizvodnje"
                  value={productionYear}
                  disabled={true}></TextField>

                <DropdownCategory
                  value={true}
                  category={checkedCat}
                  subcategory={checkedSub}></DropdownCategory>
            
              </Box>
              <CardActions>
                  <Button
                    variant="outlined"
                    color="info"
                   >
                    Update
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    >
                    Obriši oglas
                  </Button>
                </CardActions>
              
            </Container>
         
          </form>
          
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default DonacijaKard;
