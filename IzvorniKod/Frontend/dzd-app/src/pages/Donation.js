import React from 'react';
import Dropdown from '../components/DropdownCategory'
import Header from '../components/Header';
import ImageUploader from '../components/ImageUploader';
import Item from '../components/ItemForm';
import MyDropdown from '../components/DropdownCategory';
function Donation() {
    return (
        <React.Fragment>
            <Header /> 
            <ImageUploader />
            <Item />
        </React.Fragment>
    )
}
export default Donation;