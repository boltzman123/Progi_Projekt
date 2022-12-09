import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

import "../style/components/RegistracijaForm.css";
import "../style/components/Buttons.css";
import PUB from "../components/PUB.jsx"


const User = () => {
    return ( 
        <React.Fragment>
          Pregledaj i/ili uredi svoje podatke
            <PUB />
            <Link to={"/djeca"}>
                <button>
                    Pregledaj podatke o djeci
                </button>
            </Link>
        </React.Fragment>
        
    );
}
 
export default User;