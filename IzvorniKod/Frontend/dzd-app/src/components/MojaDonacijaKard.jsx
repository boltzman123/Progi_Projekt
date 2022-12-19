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

import { Modal } from "@mui/material";
import { TextField, Select, Button, FormControl, FormLabel} from "@mui/material";
import { RadioGroup, FormControlLabel, Radio, InputLabel, MenuItem, Box, Container} from "@mui/material";

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

const MojeDonacijaKard = (props) => {
  let [productName, setProductName] = useState(props.donacija.item.productName);
  let [itemState, setItemState] = useState(props.donacija.item.itemState);
  let [productBrand, setProductBrand] = useState(props.donacija.item.productBrand);
  let [productionYear, setProductionYear] = useState(props.donacija.item.productionYear);

  let [donationName, setDonationName] = useState(props.donacija.donationName);
  let [dateOfPublication, setDateOfPublication] = useState(props.donacija.dateOfPublication);
  let [userLocation, setUserLocation] = useState(props.donacija.user.userLocation);

  let { email } = props.donacija.user;
  let { idDonation } = props.donacija;
  let { id } = props.donacija.item;
  let [message, setMessage] = useState(props.donacija.message);
  let [valid, setValid] = useState(props.donacija.valid);
  let [edit, setEdit] = useState(props.donacija.edit);
  let userL = JSON.parse(localStorage.getItem("user"));
  let emailL = userL.email;

  const ageRange = [...Array(16).keys()];
  const [dob, setDob] = useState(props.donacija.item.forAge);
  const [spol, setSpol] = useState(props.donacija.item.forSex);

  const [checkedCat, setCheckedCat] = useState(props.donacija.item.category);
  const [checkedSub, setCheckedSub] = useState(props.donacija.item.subcategory);
  const [checkedUser, setCheckedUser] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pictureURL, setPictureURL] = useState(props.donacija.pictureURL);

  //   console.log(props.donacija)

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    localStorage.removeItem("cat");
    localStorage.removeItem("sub");
    setOpen(false);
  };

  const handleImageChange = (event) => {
    // Update the selected image in state
    setSelectedImage(event.target.files[0]);
    setPictureURL(URL.createObjectURL(event.target.files[0]));
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (emailL == email) {
      setCheckedUser(false);
      console.log(emailL == email);
    } else {
      setCheckedUser(true);
    }
  }, []);

  const onSubmit = (e) => {

    e.preventDefault();
    let cat = JSON.parse(localStorage.getItem("cat"));
    let sub = JSON.parse(localStorage.getItem("sub"));
    setCheckedCat(cat);
    setCheckedSub(sub);

    axios({
      method: "put",
      url: `/api/item/${id}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        id,
        productName: productName,
        itemState: itemState,
        productionYear: parseInt(productionYear),
        productBrand: productBrand,
        forAge: dob,
        forSex: spol,
        category: cat,
        subcategory: sub,
      },
    })
      .then((response) => {
        console.log(response.data);
        let user = JSON.parse(localStorage.getItem("user"));
        let item = response.data;
        axios({
          method: "put",
          url: `/api/donation/${idDonation}`,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
          data: {
            idDonation,
            donationName,
            pictureURL,
            user,
            item,
            dateOfPublication,
            handoverLocation: userLocation,
          },
        })
          .then((response) => {
            console.log(response.data);
            handleClose();
            navigate("/base");
            toast.success("Promjene spremljene u bazu!");
          })
          .catch((err) => {
            console.log(err);
            toast.error("Došlo je do greške s donacijom");
          });
      })
      .catch((err) => {
        console.log(err);
        toast.error("Došlo je do greške s predmetom");
      });
  };

  const deleteOglas = () => {

    let cat = JSON.parse(localStorage.getItem("cat"));
    let sub = JSON.parse(localStorage.getItem("sub"));

    axios({
      method: "delete",
      url: `/api/donation/${idDonation}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
    })
      .then((response) => {
        console.log(response.data);
        axios({
          method: "delete",
          url: `/api/item/${id}`,
          headers: {
            "Content-Type": "application/json; charset=utf-8",
          },
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((err) => {
            toast.error("Došlo je do greške");
          });
        handleClose();
        window.location.reload();
        toast.success("Donacija uspješno obrisana!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Došlo je do greške");
      });
  };

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
            <h3>Predviđena dob korisnika: {dob}</h3>
            <h3>Datum objave: {dateOfPublication} </h3>
            <h3>Lokacija: {userLocation} </h3>
            <h3 id="sit">Validno: {String(valid)}</h3>
            <h3 id="sit">Treba urediti: {String(edit)}</h3>
            <h3 id="sit">Poruka od admina: {message}</h3>
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
                  onChange={(e) => setDonationName(e.target.value)}
                  label="Ime donacije"
                  id="ImeDonacije"
                  value={donationName}
                  disabled={checkedUser}></TextField>

                <TextField
                  onChange={(e) => setProductName(e.target.value)}
                  label="Ime predmeta"
                  id="ImePredmeta"
                  value={productName}
                  disabled={checkedUser}></TextField>

                <TextField
                  onChange={(e) => setDateOfPublication(e.target.value)}
                  label="Datum objave"
                  id="datumObjave"
                  value={dateOfPublication}
                  disabled={checkedUser}></TextField>

                <TextField
                  onChange={(e) => setUserLocation(e.target.value)}
                  label="Lokacija preuzimanja"
                  id="datumObjave"
                  value={userLocation}
                  disabled={checkedUser}></TextField>

                <FormControl fullWidth>
                  <InputLabel>Predviđena dob:</InputLabel>
                  <Select
                    style={{ width: 225 }}
                    disabled={checkedUser}
                    labelId="dob-select-label"
                    id="dob-select"
                    value={dob}
                    label="Dob"
                    required
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
                        disabled={checkedUser}
                        control={<Radio />}
                        label="Žensko"
                      />
                      <FormControlLabel
                        value="M"
                        disabled={checkedUser}
                        control={<Radio />}
                        label="Muško"
                      />
                    </div>
                  </RadioGroup>
                </FormControl>

                <TextField
                  onChange={(e) => setItemState(e.target.value)}
                  label="Stanje predmeta"
                  id="stanjePredmeta"
                  value={itemState}
                  disabled={checkedUser}></TextField>

                <TextField
                  onChange={(e) => setProductBrand(e.target.value)}
                  label="Naziv marke predmeta"
                  id="markaPredmeta"
                  value={productBrand}
                  disabled={checkedUser}></TextField>

                <TextField
                  type="number"
                  onChange={(e) => setProductionYear(e.target.value)}
                  label="Godina proizvodnje"
                  id="godinaProizvodnje"
                  value={productionYear}
                  disabled={checkedUser}></TextField>

                <DropdownCategory
                  value={checkedUser}
                  category={checkedCat}
                  subcategory={checkedSub}></DropdownCategory>
                <div>
                  <input
                    style={email != emailL ? { display: `none` } : {}}
                    type="file"
                    onChange={handleImageChange}
                  />
                </div>
              </Box>
              <CardActions>
                <Button
                  type="submit"
                  style={email != emailL ? { display: `none` } : {}}
                  variant="outlined"
                  color="info">
                  Update
                </Button>
                <Button
                  onClick={deleteOglas}
                  style={email != emailL ? { display: `none` } : {}}
                  variant="outlined"
                  color="error">
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

export default MojeDonacijaKard;
