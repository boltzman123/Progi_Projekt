import React from 'react';

import "../style/components/Buttons.css";

import PUO from "../components/PUO";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DjecaBtn from "../components/DjecaBtn"

const User = () => {
    
    return ( 
        <React.Fragment>
          <Header />
          <PUO />
          <DjecaBtn />
          <Footer />
        </React.Fragment>
        
    );
}
 
export default User;