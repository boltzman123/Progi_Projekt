import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import axios from "axios";
import { toast } from "react-toastify";
import { useState, useEffect } from "react";

const UserKard = (props) => {
  const [userName, setUserName] = useState(props.user.userName);
  const [userSurname, setUserSurname] = useState(props.user.userSurname);
  const [email, setEmail] = useState(props.user.email);
  const [userLocation, setLocation] = useState(props.user.userLocation);
  const [mailSent, setMailSent] = useState(props.user.mailSent);
  const [password, setPassword] = useState(props.user.password);
  const [canDonate, setCanDonate] = useState(props.user.canDonate);

  const giveUserLicence = () => {
    setCanDonate(true);
    console.log(userName, userSurname,  email, userLocation, mailSent, password, canDonate)
    axios({
      method: "put",
      url: `/api/users/${email}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        email: email,
        userName: userName,
        userSurname: userSurname,
        password: password,
        userLocation: userLocation,
        canDonate: "true",
        mailSent: mailSent,
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
    setCanDonate("false");
    axios({
      method: "put",
      url: `/api/users/${email}`,
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      data: {
        email: email,
        userName: userName,
        userSurname: userSurname,
        password: password,
        userLocation: userLocation,
        canDonate: "false",
        mailSent: mailSent,
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
      <Card style={{ borderRadius: 20, height: "fit-content", marginBottom:"40px" }} variant="outlined">
        <h1 style={{ color: "rgba(244, 177, 131, 255)", textAlign: "center" }}>
          {userName} {userSurname}
        </h1>

        <CardContent sx={{ bgcolor: "#E8E8E8" }}>
          <h3>E-mail: {email}</h3>
          <h3>Lokacija: {userLocation}</h3>
          {canDonate == true ? (
            <h3>Može donirat: Da</h3>
          ) : (
            <h3>Može donirat: Ne</h3>
          )}
          {mailSent == "true" ? (
            <h3>Mail poslan: Da</h3>
          ) : (
            <h3>Mail poslan: Ne</h3>
          )}
        </CardContent>
        <CardActions>
          <Button variant="outlined" color="success" onClick={giveUserLicence}>
            Dodijeli dozvolu
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
