import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const UserKard = (props) => {
  let { userName, userSurname, email, userLocation, canDonate, mailSent, password } =
    props.user;
  console.log(props.user)
  if (canDonate) {
    canDonate = " Da";
  } else {
    canDonate = " Ne";
  }
  if (mailSent) {
    mailSent = " Da";
  } else {
    mailSent = " Ne";
  }
  const giveUserLicence = () => {
    canDonate = true
    console.log("tu sam")
    axios({
      method: "put",
      url: `/api/users/${email}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        userName,
        userSurname,
        userLocation,
        email,
        canDonate,
        mailSent
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        toast.error("Došlo je do greške");
      });
  };
  const deleteUserLicence = () => {
    axios({
      method: "put",
      url: `/api/users/${email}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        userName,
        userSurname,
        userLocation,
        email,
        password,
        canDonate: "true",
        mailSent,
      },
    })
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        toast.error("Došlo je do greške");
      });
  };

  return (
    <React.Fragment>
      <Card style={{ borderRadius: 20 }} variant="outlined">
        <h1 style={{ color: "rgba(244, 177, 131, 255)", textAlign: "center" }}>
          {userName} {userSurname}
        </h1>

        <CardContent sx={{ bgcolor: "#E8E8E8" }}>
          <h3>E-mail: {email}</h3>
          <h3>Lokacija: {userLocation}</h3>
          <h3>Može donirat:{canDonate} </h3>
          <h3>Poslan mail: {mailSent}</h3>
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="success" onClick={giveUserLicence}>
            Dodjeli dozvolu
          </Button>
          <Button variant="outlined" color="error" onClick={deleteUserLicence}>
            Oduzmi dozvolu
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
};

export default UserKard;
