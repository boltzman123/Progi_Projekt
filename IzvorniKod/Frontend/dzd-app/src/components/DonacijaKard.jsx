import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from '@mui/material/CardMedia';
import { CardActionArea } from '@mui/material';
import DonacijaKardCSS from '../style/components/DonacijaKard.module.css'

const DonacijaKard = (props) => {
  let { productName, forAge} = props.donacija.item;
  let { donationName, dateOfPublication,pictureURL} = props.donacija;
  let { userLocation } = props.donacija.user;
  console.log(props.donacija)

  return (
        <Card className={DonacijaKardCSS.malaKartica} variant="outlined">
            {/* OVDJE UPISI LINK KOJI VODI NA FULL PREGLED TOG PREDMETA */}
            <CardActionArea href={`api/donation/${props.donacija.idDonation}`}>
                <CardMedia
                className={DonacijaKardCSS.img}
                component="img"
                image={pictureURL}
                alt="slika predmeta koji se donira"
                />
                    <h1 style={{ color: "rgba(244, 177, 131, 255)", textAlign: "center" }}>
                        {donationName}
                    </h1>
                    <CardContent sx={{ bgcolor: "#E8E8E8" }}>
                        <h3>Ime predmeta: {productName}</h3>
                        <h3>Predviđena dob korisnika: {forAge}</h3>
                        <h3>Datum objave: {dateOfPublication} </h3>
                        <h3>Lokacija: {userLocation} </h3>
                    </CardContent>
            </ CardActionArea>
        </Card>
  );
};

export default DonacijaKard;
