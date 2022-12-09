import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { response } from "express";
import { toast } from "react-toastify";

const DonationForm = () => {
    const [idDonation, setIdDonation] = useState("")
    const [donationName, setDonatioName] = useState("");
    const [dateOfPublication, setDateOfPublication] = useState("");
    const [dateOfClosing, setDateOfClosing] = useState("");
    const [isValid, setIsValid] = useState("");
    const [isActive, setIsActive] = useState("");
    const [handoverLocation, setHandoverLocation] = useState("");
    const [email, setEmail] = useState("");
    const [idItem, setIdItem] = useState("");
    const [pictureUrl, setPictureUrl] = useState("");

    const navigate = useNavigate();
    const onSubmit = (e) => {
        axios({
            method: "post",
            url: "/api/item",
            headers: { "Content-Type": "application/json; charset=utf-8" },
            data: {
              
            },
          })
            .then((response) => {
              console.log(response.data);
              toast.success("Predano na odobravanje!");
            })
            .catch((err) => {
              toast.error("Greška!");
            });
            axios({
                method: "post",
                url: "/api/donation",
                headers: { "Content-Type": "application/json; charset=utf-8" },
                data: {
                  donationName,
                  dateOfPublication,
                  dateOfClosing,
                  isValid,
                  isActive,
                  handoverLocation,
                  email,
                  id: idItem,
                  pictureUrl,
                },
              })
                .then((response) => {
                  console.log(response.data);
                  toast.success("Predano na odobravanje!");
                })
                .catch((err) => {
                  toast.error("Greška!");
                });
        
    }
  

    return (
        <React.Fragment>

        </React.Fragment>
    )
};
