import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../style/components/RegistracijaBtn.css"


class RegistracijaBtn extends Component {
    state = {  } 
    render() { 
        return (
            <Link to={"/registracija"}><button id='registracijaBtn'>Registracija</button></Link>
        );
    }
}
 
export default RegistracijaBtn;