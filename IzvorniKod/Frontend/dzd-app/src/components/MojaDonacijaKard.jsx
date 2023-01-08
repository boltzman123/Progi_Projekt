import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { CardActionArea, grid2Classes } from "@mui/material";
import DonacijaKardCSS from "../style/components/DonacijaKard.module.css";
import CardActions from "@mui/material/CardActions";

import storage from "../firebaseConfig.js"
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/storage"
import {v4} from 'uuid'

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
  let [opis, setOpis] = useState(props.donacija.description);

  let [donationName, setDonationName] = useState(props.donacija.donationName);
  let [dateOfPublication, setDateOfPublication] = useState(props.donacija.dateOfPublication);
  let [handoverLocation, setHandoverLocation] = useState(props.donacija.handoverLocation);
  let [dobivatelj,setDobivatelj] = useState("");
  let [dobivateljEmail,setDobivateljEmail] = useState("");
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
  const [donatedTo, setDonatedTo] = useState(props.donacija.donatedToUser);

  const [checkedCat, setCheckedCat] = useState(props.donacija.item.category);
  const [checkedSub, setCheckedSub] = useState(props.donacija.item.subcategory);
  const [selectedImage, setSelectedImage] = useState(null);
  const [pictureURL, setPictureURL] = useState(props.donacija.pictureURL);
  const [smijeMijenjati, setSmijeMijenati] = useState()
  const [btnDisabled, setBtnDisabled] = useState(true)

  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  let datum=String(dateOfPublication.substring(8,10)+ "." +dateOfPublication.substring(5,7)+ "." +dateOfPublication.substring(0,4)+".")

  //   console.log(props.donacija)

  // Event handler for when the user selects an image
  const handleChange = (event) => {
    setFile(event.target.files[0]);
    handleUpload();
  };
  // console.log(pictureURL);

  function handleUpload() {
      if (!file) {
        alert("Molimo Vas da odaberete sliku")
      }
      const storageRef = ref(storage, `/files/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
          (snapshot) => { 
          setPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              console.log(url); 
              setPictureURL(url);
            });
          }
        ); 
    }

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    localStorage.removeItem("cat");
    localStorage.removeItem("sub");
    setOpen(false);
  };

  const navigate = useNavigate();

  useEffect(() => {
    if (donatedTo!=null){
      setSmijeMijenati(true);
    }
    else{
      setSmijeMijenati(false);
    }
  }, [donatedTo]);

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
            handoverLocation: handoverLocation,
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

  const dohvatiKorisnika= ()=>{
    if (dobivateljEmail!=props.donacija.user.email){
      axios({
      method: 'get',
      url: `/api/users/${dobivateljEmail}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      }
    }).then((response)=>{
      // console.log(response.data)
      toast.success("Korisnik postoji i možete mu donirati ovaj predmet")
      setBtnDisabled(false)
      setDobivatelj(response.data)
    }).catch((err) => {
      console.log(err);
      setBtnDisabled(true);
  });}
  else {
    console.log("Ne mozes sam sebi donirati");
    toast.error("Ne možete sami sebi donirati donaciju!")
    setBtnDisabled(true)
  }
    
  }

  const predajOglas= (e)=>{
      e.preventDefault();
  
      axios({
        method: "put",
        url: `/api/donation/${props.donacija.idDonation}`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          "idDonation":props.donacija.idDonation,
          "donationName": props.donacija.donationName,
          "dateOfPublication": props.donacija.dateOfPublication,
          "dateOfClosing": new Date(),
          "edit": "false",
          "message": "",
          "pictureURL": props.donacija.pictureURL,
          "handoverLocation": props.donacija.handoverLocation,
          donatedToUser: dobivatelj,
          "active": "true",
          "valid": "true",
          "description":opis,
          user:props.donacija.user,
          item:props.donacija.item
        },
      }).then((response) => {
          handleClose();
          toast.success("Donirali ste svoj predmet!");
          window.location.reload(false)
      })
      .catch((err) => {
          console.log(err);
          toast.error("Došlo je do greške s doniranjem");
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
            <h3>Datum objave: {datum} </h3>
            <h3>Lokacija: {handoverLocation} </h3>
            <hr/>
            <h3 id="sit">Validno: {String(valid)=="true"?"Oglas je validan":"Oglas nije validan"}</h3>
            <h3 id="sit">Treba urediti: {String(edit)=="true"?"Treba urediti":"Ne treba urediti"}</h3>
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
                  disabled={smijeMijenjati}></TextField>

                <TextField
                  onChange={(e) => setProductName(e.target.value)}
                  label="Ime predmeta"
                  id="ImePredmeta"
                  value={productName}
                  disabled={smijeMijenjati}></TextField>

                <TextField
                  onChange={(e) => setDateOfPublication(e.target.value)}
                  label="Datum objave"
                  id="datumObjave"
                  value={datum}
                  disabled={true}></TextField>

                <TextField
                  onChange={(e) => setHandoverLocation(e.target.value)}
                  label="Lokacija preuzimanja"
                  id="datumObjave"
                  value={handoverLocation}
                  disabled={smijeMijenjati}></TextField>

                <TextField
                  label="Lokacija donatora"
                  id="datumObjave"
                  value={userLocation}
                  disabled={true}></TextField>

                <TextField
                  label="Email donatora"
                  id="datumObjave"
                  value={email}
                  disabled={true}></TextField>

                <FormControl fullWidth>
                  <InputLabel>Predviđena dob:</InputLabel>
                  <Select
                    style={{ width: 225 }}
                    disabled={smijeMijenjati}
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
                  <FormLabel id="spol">Namijenjeni spol</FormLabel>
                  <RadioGroup
                    name="spol-radio-buttons-group"
                    value={spol}
                    required
                    onChange={(e) => setSpol(e.target.value)}>
                    <div>
                      <FormControlLabel
                        value="F"
                        disabled={smijeMijenjati}
                        control={<Radio />}
                        label="Žensko"
                      />
                      <FormControlLabel
                        value="M"
                        disabled={smijeMijenjati}
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
                  disabled={smijeMijenjati}></TextField>

                <TextField
                  onChange={(e) => setProductBrand(e.target.value)}
                  label="Naziv marke predmeta"
                  id="markaPredmeta"
                  value={productBrand}
                  disabled={smijeMijenjati}></TextField>

                <TextField
                  type="number"
                  onChange={(e) => setProductionYear(e.target.value)}
                  label="Godina proizvodnje"
                  id="godinaProizvodnje"
                  value={productionYear}
                  disabled={smijeMijenjati}></TextField>

                <DropdownCategory 
                  value={smijeMijenjati}
                  category={checkedCat}
                  subcategory={checkedSub}></DropdownCategory>
                <div style={{display:smijeMijenjati==true?"none":""}}>
                  <input type="file" accept="image/*" onChange={handleChange}/>
                  <p style={{display:percent=="100"?"none":""}}>{percent} "% done"</p>
                  <button onClick={handleUpload} type="button">Upload slike</button>
                </div>
                <TextField
                  onChange={(e) => setDobivateljEmail(e.target.value)}
                  label="Email primatelja donacije"
                  sx={{display:smijeMijenjati==true?"none":""}}
                  id="predajeSeKorisniku"
                  type="email"
                  value={dobivateljEmail}
                  disabled={smijeMijenjati}></TextField>
                  
                <Button
                  onClick={dohvatiKorisnika}
                  sx={{display:smijeMijenjati==true?"none":""}}
                  style={email != emailL ? { display: `none` } : {}}
                  variant="outlined"
                  color="info"
                  id="provjera">
                  Provjera korisnika
                </Button>
                
                <Button
                  onClick={predajOglas}
                  style={email != emailL ? { display: `none` } : {}}
                  variant="outlined"
                  color="error"
                  id="predaj">
                  Predaj oglas
                </Button>

              </Box>
              <hr/>
              <CardActions sx={{display:smijeMijenjati==true?"none":""}}>
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
