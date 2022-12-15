import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/components/LoginForm.css";
import "../style/components/Buttons.css";
import axios from "axios";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { Link } from "react-router-dom";
import { toast } from 'react-toastify';

export const LoginAll = () => {
  const [email, setEmail] = useState("");
  const [emailErr, setEmailErr] = useState("")
  const [pass, setPass] = useState("");
  const [passErr, setPassErr] = useState("")

  const navigate=useNavigate();

  const hasErrs = () => {
    if (emailErr || passErr) 
      return true
    return false
  }

  const notFilled = () => {
    if (!pass || !email)
      return true
    return false
  }

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
        }).then((response) => {
          console.log(response.data);
          var user=response.data;
          window.localStorage.setItem('user', JSON.stringify(user));
          if (user.email == "admin"){
            window.localStorage.setItem('isAdmin', "true");
          }

          var now = new Date().getTime();
          var setupTime = localStorage.getItem('setupTime');

          if (setupTime == null) {
            localStorage.setItem('setupTime', now)
          }
          navigate('/base');
        })
        .catch(err => {
          toast.error("Krivi username ili password!");
        });
    }


  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="frame">
          <FiMail className="icon" style={{marginTop: emailErr ? '20px' : '1px', marginRight: emailErr ? '-0.5px': '0px'}}></FiMail>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="Email"
            className={emailErr ? "inputFrame inputFrameErr" : "inputFrame"}
            onBlur={() => {
              if (!email) {
                setEmailErr("Email adresa mora biti upisana.")
              } else if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) || email == "admin")) {
                setEmailErr("Email adresa mora biti ispravno formatirana.")
              } else {
                setEmailErr("")
              }
            }}
          />
        </div>
        <div className="errorMessage" style={{display: emailErr ? 'block' : 'none' }}>{emailErr}</div>

        <div className="frame">
          <FiLock className="icon" style={{marginTop: passErr ? '20px' : '1px', marginRight: passErr ? '-0.5px': '0px'}}></FiLock>
          <input
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            type="password"
            name="pass"
            id="pass"
            placeholder="Lozinka"
            className={passErr ? "inputFrame inputFrameErr" : "inputFrame"}
            onBlur={() => {
              if (!pass) {
                setPassErr("Lozinka mora biti upisana.")
              } else if (pass.length < 3){
                setPassErr("Lozinka mora biti dulja od 2 znaka.")
              } else {
                setPassErr("")
              }
            }}
          />
        </div>
        <div className="errorMessage" style={{display: passErr ? 'block' : 'none' }}>{passErr}</div>

        <div className="buttonsLogin">
          <button className="gumbic tamniji" type="submit" disabled={hasErrs() || notFilled()}>
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
