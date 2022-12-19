import React, { useState } from "react";
import HeaderCSS from "../style/components/Header.module.css";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink } from "react-router-dom";

function Header() {
  const [url, defUrl] = useState(window.location.href);
  let user = JSON.parse(localStorage.getItem("user"));
  if (user.email == "admin") {
    return (
      <React.Fragment>
        <Navbar bg="light" variant="light">
          <Container>
            <Nav className={HeaderCSS.header}>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                to="/base">
                Pregled aktivnih donacija
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                to="/neobjavljeneDonacije">
                Pregled neobjavljenih donacija
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                to="/pregledKorisnika">
                Pregled korisnika
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                to="/user">
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
              height: 0,
            }}></div>
        </Navbar>
      </React.Fragment>
    );
  } else if (user.canDonate===true) {
    return (
      <React.Fragment>
        <Navbar bg="light" variant="light">
          <Container>
            <Nav className={HeaderCSS.header}>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                to="/base">
                Aktivne donacije
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                to="/mojeDonacije">
                Moje donacije
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                to="/doniraj">
                Doniraj
              </NavLink>
              <NavLink
                style={({ isActive }) =>
                  isActive
                    ? { textDecoration: "underline" }
                    : { textDecoration: "none" }
                }
                to="/user">
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
              height: 0,
            }}></div>
        </Navbar>
      </React.Fragment>
    );
  } else {
    return (
    <React.Fragment>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav className={HeaderCSS.header}>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { textDecoration: "underline" }
                  : { textDecoration: "none" }
              }
              to="/base">
              Aktivne donacije
            </NavLink>
            <NavLink
              style={({ isActive }) =>
                isActive
                  ? { textDecoration: "underline" }
                  : { textDecoration: "none" }
              }
              to="/user">
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
            height: 0,
          }}></div>
      </Navbar>
    </React.Fragment>
    );
    }
}
export default Header;
