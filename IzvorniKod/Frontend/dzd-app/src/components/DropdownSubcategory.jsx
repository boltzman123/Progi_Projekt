import React, { Component, useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

var arraySub = [];

function DropdownSubcategory() {
  const [chosenCategory, setChosenCategory] = useState("");
  const [chosenSubcategory, setChosenSubCategory] = useState("");

  var mapCat = new Map();
  var aryCat = [];

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/subcategory",
    }).then((response) => {
      var pod = Object.values(response.data);
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
  });

  const setSub = () => {
    if (null) {
      return "Odaberi prvo kategoriju";
    }
  };

  return (
    <React.Fragment>
      <div style={{ width: 200 }}>
        <Dropdown
          options={aryCat}
          value={chosenCategory}
          onChange={(e) => {
            setChosenCategory(e.value);
            let values = mapCat.get(e.value);
            arraySub = [].concat(values);
            console.log(values);
          }}
          placeholder="Kategorije"
        />
      </div>
      <div style={{ width: 250 }}>
        <Dropdown
          options={arraySub}
          value={chosenSubcategory}
          onChange={(e) => {
            setChosenSubCategory(e.value);
            console.log(e.value);
          }}
          placeholder="Potkategorije"
        />
      </div>
    </React.Fragment>
  );
}
export default DropdownSubcategory;
