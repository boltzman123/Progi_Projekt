import React from 'react';

import "../style/components/RegistracijaForm.css";
import "../style/components/Buttons.css";

import PUO from "../components/PUO";
import Header from "../components/Header";
import Footer from "../components/Footer";

const User = () => {
    
    return ( 
        <React.Fragment>
          <Header />
          <PUO />
          <Footer />
        </React.Fragment>
        
    );
}
 
export default User;