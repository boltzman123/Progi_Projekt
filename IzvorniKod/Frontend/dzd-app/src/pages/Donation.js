import React from "react";
import Dropdown from "../components/DropdownCategory";
import Header from "../components/Header";
import MyDropdown from "../components/DropdownCategory";
import Footer from "../components/Footer";
import DonationForm from "../components/DonationForm";
import DonationFormCSS from "../style/components/DonationForm.module.css";

function Donation() {
  return (
    <React.Fragment>
        <Header></Header>
        <DonationForm></DonationForm>
        <Footer name={"footerProfil"}></Footer>
    </React.Fragment>
  );
}
export default Donation;
