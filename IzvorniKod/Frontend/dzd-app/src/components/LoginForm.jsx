import React, { useState } from "react";
import "../style/components/LoginForm.css";
import "../style/components/Buttons.css";
import axios from "axios";
//import { FiMail } from "react-icons/fi";
//import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";

export const LoginAll = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

        //ovo raditi za post
        axios({
          method: 'post',
          url: '/api/users/login',
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          },
          data:{
            email: email,
            password: pass
          }
        }).then((response) => console.log(response))
    }


  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="frame">
          {/* <FiMail className="icon"></FiMail> */}
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            className="inputFrame"
            required={true}
          />
        </div>

        <div className="frame">
          {/* <FiLock className="icon"></FiLock> */}
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            name="pass"
            id="pass"
            placeholder="Lozinka"
            className="inputFrame"
            required={true}
          />
        </div>

        <div className="buttonsLogin">
          <button className="gumbic tamniji" type="submit">
            Prijavi se
          </button>
          <Link to={"/registracija"}>
            <button className="gumbic upitnik">Nemaš profil?</button>{" "}
          </Link>
        </div>
      </form>
    </>
  );
};

export default LoginAll;
