import React, { Component, useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";


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
    // console.log(response.data[0]);
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
  });
}


function DropdownCategory(props) {
  const [chosenSubcategory, setChosenSubCategory] = useState(props.subcategory);
  const [chosenCategory, setChosenCategory] = useState(props.category);
  const [subcategoryName, setSubcategoryName] = useState("");
  const [categoryName, setCategoryName] = useState("");
  let [value, setValue] = useState(props.value)

  var array = [];


  return (
    <React.Fragment>
          <div style={{ width: 225 }}>
          <Dropdown
            disabled={value}
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
          <div style={{ width: 225 }}>
          <Dropdown
            disabled={value}
              options={arraySub}
              value={chosenSubcategory.subcategoryName}
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

    </React.Fragment>
  );
}
export default DropdownCategory;
