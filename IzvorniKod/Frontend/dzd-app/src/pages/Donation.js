import React from 'react';
import Dropdown from '../components/DropdownCategory'
import Header from '../components/Header';
import MyDropdown from '../components/DropdownCategory';
import Footer from '../components/Footer';
import DonationForm  from '../components/DonationForm';

function Donation() {
    return (
        <React.Fragment>
            <Header /> 
            <DonationForm></DonationForm>
            <Footer></Footer>
        </React.Fragment>
    )
}
export default Donation;