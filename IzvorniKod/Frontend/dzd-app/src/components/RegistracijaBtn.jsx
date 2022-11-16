import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../style/components/Buttons.css"

class RegistracijaBtn extends Component {
    render() { 
        return (
            <Link to={"/registracija"}>
                <button className='gumbic svijetliji'>
                    Registracija
                </button>
            </Link>
        );
    }
}
 
export default RegistracijaBtn;