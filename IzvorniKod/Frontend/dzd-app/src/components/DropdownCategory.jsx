import React, { useState, useEffect } from "react";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

var mapCat = new Map();
var aryCat = [];
var privremeniAry = [];
function setOptions(chosenCategory, arraySub, setArySub) {
  axios({
    method: "get",
    url: "/api/subcategory",
  }).then((response) => {
    var pod = Object.values(response.data);
    privremeniAry = response.data;
    // console.log(response.data[0]);

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
    let values = mapCat.get(chosenCategory.categoryName);
    setArySub([].concat(values));
    console.log(arraySub);
  });
}

function DropdownCategory(props) {
  const [chosenSubcategory, setChosenSubCategory] = useState(props.subcategory);
  const [chosenCategory, setChosenCategory] = useState(props.category);
 
  let [arraySub, setArySub] = useState([]);
  let [value, setValue] = useState(props.value);
  localStorage.setItem("cat", JSON.stringify(chosenCategory))
  localStorage.setItem("sub", JSON.stringify(chosenSubcategory))

  useEffect(() => {
    setOptions(chosenCategory, arraySub, setArySub);
    console.log("ovdje");
  }, []);

  const checkSubInCat = (cat) => {
    let subs = mapCat.get(cat);
    if (!subs.includes(chosenSubcategory.subcategoryName)) {
      for (let i = 0; i < privremeniAry.length; ++i) {
        if (privremeniAry[i].subcategoryName == subs[0]) {
          setChosenSubCategory(privremeniAry[i]);
          localStorage.setItem("sub", JSON.stringify(privremeniAry[i]))
        }
      }
    }
  };

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
            let values = mapCat.get(e.value);
            setArySub([].concat(values));
            checkSubInCat(e.value);
            localStorage.setItem("cat", JSON.stringify(obj))
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
                setChosenSubCategory(obj);
                localStorage.setItem("sub", JSON.stringify(obj))
                console.log(e.value);
              }
            }
          }}
          placeholder="Potkategorije"
          required={true}
        />
      </div>
    </React.Fragment>
  );
}
export default DropdownCategory;
