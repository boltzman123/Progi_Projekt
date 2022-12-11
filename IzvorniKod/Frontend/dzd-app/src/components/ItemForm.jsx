import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Dropdown from "react-dropdown";

var arraySub = [];
var mapCat = new Map();
var aryCat = [];
var privremeniAry = [];
function setOptions() {
  axios({
    method: "get",
    url: "/api/subcategory",
  }).then((response) => {
    var pod = Object.values(response.data);
    privremeniAry = response.data;
    console.log(response.data[0]);
    var podMap = new Map();
    for (let i = 0; i < pod.length; ++i) {
      let data = pod[i].category.categoryName;
      if (!mapCat.has(data)) {
        let ary = [pod[i].subcategoryName];
        aryCat.push(data);
        mapCat.set(pod[i].category.categoryName, ary);
      } else if (data != undefined && mapCat.has(data)) {
        let key = pod[i].category.categoryName;
        let ary = [].concat(mapCat.get(pod[i].category.categoryName));
        if (!ary.includes(pod[i].subcategoryName)) {
          ary.push(pod[i].subcategoryName);
          mapCat.set(key, ary);
        }
      }
    }
    console.log(aryCat);
  });
}

const ItemForm = () => {
  const [id, setId] = useState("");
  const [forAge, setforAge] = useState("");
  const [forSex, setSex] = useState(["M", "F"]);
  const [chosenSex, setChosenSex] = useState("");
  const [productionYear, setProductionYear] = useState("");
  const [itemState, setState] = useState("");
  const [productionBrand, setProductionBrand] = useState("");
  const [categoryName, setCategoryName] = useState("");
  const [subcategoryName, setSubcategoryName] = useState("");
  const [productName, setProductName] = useState("");
  const [chosenCategory, setChosenCategory] = useState("");
  const [chosenSubcategory, setChosenSubCategory] = useState("");
  setOptions();

  const onSubmitItem = () => {
    let item = {};
    item.productName = productName;
    item.itemState = itemState;
    item.productionYear = productionYear;
    item.productBrand = productionBrand;
    item.forAge = forAge;
    item.forSex = chosenSex;
    item.category = chosenCategory;
    item.subcategory = subcategoryName;
    localStorage.setItem("item", JSON.stringify(item));
  };

  return (
    <React.Fragment>
      <form>
        <div className="frame">
          <input
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            type="text"
            name="productName"
            id="productName"
            placeholder="Naziv predmeta"
            className="inputFrame"
            required={true}></input>
        </div>
        <div className="frame">
          <input
            value={forAge}
            onChange={(e) => setforAge(e.target.value)}
            type="number"
            name="forAge"
            id="forAge"
            placeholder="Predviđena dob"
            className="inputFrame"
            required={true}></input>
        </div>
        <div className="frame">
          <div style={{ width: 200 }}>
            <Dropdown
              options={forSex}
              value={chosenSex}
              onChange={(e) => {
                setChosenSex(e.value);
              }}
              placeholder="Predviđeni spol"
              required={true}
            />
          </div>
        </div>

        <div className="frame">
          <input
            value={productionYear}
            onChange={(e) => setProductionYear(e.target.value)}
            type="number"
            name="productionYear"
            id="productionYear"
            placeholder="Godina proizvodnje"
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
            placeholder="Marka predmeta"
            className="inputFrame"
            required={true}></input>
        </div>

        <div className="frame">
          <div style={{ width: 200 }}>
            <Dropdown
              options={aryCat}
              value={chosenCategory.categoryName}
              onChange={(e) => {
                let obj = { categoryName: e.value };
                setChosenCategory(obj);
                setCategoryName(e.value);
                let values = mapCat.get(e.value);
                arraySub = [].concat(values);
              }}
              placeholder="Kategorije"
              required={true}
            />
          </div>
          <div style={{ width: 250 }}>
            <Dropdown
              options={arraySub}
              value={chosenSubcategory}
              onChange={(e) => {
                for (let i = 0; i < privremeniAry.length; ++i) {
                  if (e.value == privremeniAry[i].subcategoryName) {
                    let obj = privremeniAry[i];
                    setChosenSubCategory(e.value);
                    setSubcategoryName(obj);
                  }
                }
                console.log(e.value);
              }}
              placeholder="Potkategorije"
              required={true}
            />
          </div>
          <button type="button" className="" onClick={onSubmitItem}>
            Spremi podatke
          </button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default ItemForm;
