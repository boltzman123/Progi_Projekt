import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DropdownCategory from "../components/DropdownCategory";
import DropdownSubcategory from "./DropdownSubcategory";

const ItemForm = () => {
  const [id, setId] = useState("");
  const [forAge, setforAge] = useState("");
  const [forSex, setSex] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [itemState, setState] = useState("");
  const [productionBrand, setProductionBrand] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");

  return (
    <React.Fragment>
      <form>
        <div className="frame">
          <input
            value={forAge}
            onChange={(e) => setforAge(e.target.value)}
            type="text"
            name="forAge"
            id="forAge"
            placeholder="Predviđena dob"
            className="inputFrame"
            required={true}></input>
        </div>
        <div className="frame">
          <input
            value={forSex}
            onChange={(e) => setSex(e.target.value)}
            type="text"
            name="forSex"
            id="forSex"
            placeholder="Predviđeni spol"
            className="inputFrame"
            required={true}></input>
        </div>

        <div className="frame">
          <input
            value={productionYear}
            onChange={(e) => setProductionYear(e.target.value)}
            type="date"
            name="productionYear"
            id="productionYear"
            placeholder="Godina proizvodnje"
            className="inputFrame"
            required={true}></input>
        </div>

        <div className="frame">
          <input
            value={forSex}
            onChange={(e) => setforAge(e.target.value)}
            type="number"
            name="forSex"
            id="forSex"
            placeholder="Predviđeni spol"
            className="inputFrame"
            required={true}></input>
        </div>

        <div className="frame">
          <input
            value={itemState}
            onChange={(e) => setState(e.target.value)}
            type="text"
            name="itemState"
            id="itemState"
            placeholder="Stanje predmeta"
            className="inputFrame"
            required={true}></input>
        </div>

        <div className="frame">
          <input
            value={productionBrand}
            onChange={(e) => setProductionBrand(e.target.value)}
            type="text"
            name="productionBrand"
            id="productionBrand"
            placeholder="Brend predmeta"
            className="inputFrame"
            required={true}></input>
        </div>

        <div className="frame">
          <DropdownSubcategory></DropdownSubcategory>
        </div>
      </form>
    </React.Fragment>
  );
};
export default ItemForm;
