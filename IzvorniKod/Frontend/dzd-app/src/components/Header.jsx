import React, { Component, useState } from "react";
import HeaderCSS from "../style/components/Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import {NavLink} from 'react-router-dom'

function Header() {
  const [url, defUrl] = useState(window.location.href);
  return (
    <React.Fragment>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className={HeaderCSS.header}>
            <NavLink style={({ isActive }) => 
                      (isActive ? {textDecoration: "underline"} : {textDecoration: 'none'})} to="/base">
              Aktivne donacije
            </NavLink>
            <NavLink style={({ isActive }) => 
                      (isActive ? {textDecoration: "underline"} : {textDecoration: 'none'})} to="/doniraj">
              Doniraj
            </NavLink>
            <NavLink style={({ isActive }) => 
                      (isActive ? {textDecoration: "underline"} : {textDecoration: 'none'})} to="/user">
              Moj profil
            </NavLink>
          </Nav>
              </Container>
              <div
        style={{
          marginTop: "0%",
          borderTop: "2px solid  ",
          marginLeft: 55,
                  marginRight: 55,
                  marginTop: 20,
          height: 0
        }}></div>
      </Navbar>
  
    </React.Fragment>
  );
}
export default Header;
