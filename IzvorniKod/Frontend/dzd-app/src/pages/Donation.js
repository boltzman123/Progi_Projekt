import React from 'react';
import Dropdown from '../components/DropdownCategory'
import Header from '../components/Header';
import ImageUploader from '../components/ImageUploader';
import Item from '../components/ItemForm';
import MyDropdown from '../components/DropdownCategory';
import Footer from '../components/Footer';
function Donation() {
    return (
        <React.Fragment>
            <Header /> 
            <ImageUploader />
            <Item />
            <Footer></Footer>
        </React.Fragment>
    )
}
export default Donation;