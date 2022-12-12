import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "../style/components/LoginForm.css";
import "../style/components/Buttons.css";
import axios from "axios";
import { FiMail } from "react-icons/fi";
import { FiLock } from "react-icons/fi";
import { Link, Navigate } from "react-router-dom";
import { toast } from 'react-toastify';

export const LoginAll = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate=useNavigate();

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
          console.log("Krivi username ili password!");  
          toast.error("Krivi username ili password!");
        });
    }


  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="frame">
          <FiMail className="icon"></FiMail>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            id="email"
            placeholder="Email"
            className="inputFrame"
            required={true}
          />
        </div>

        <div className="frame">
          <FiLock className="icon"></FiLock>
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
