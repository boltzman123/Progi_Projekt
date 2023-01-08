import React, { Component } from "react";
import "../style/components/Footer.css";
import { useState, useEffect } from 'react';


const Footer = (props) => {
    const [ime, setIme] = useState(props.name)
    console.log(props.name)
  return (
    <div className={ime}>
      <span>Djeca za djecu</span>
    </div>
  );
};

export default Footer;
