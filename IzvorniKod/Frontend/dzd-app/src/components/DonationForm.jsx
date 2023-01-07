import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetcher, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dropdown from "react-dropdown";
import storage from "../firebaseConfig.js"
import { ref, uploadBytesResumable, getDownloadURL  } from "firebase/app"
import {v4} from 'uuid'

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

const DonationForm = () => {
  const [donationName, setDonatioName] = useState("");
  const [handoverLocation, setHandoverLocation] = useState(""); 
  const [selectedImage, setSelectedImage] = useState(null);
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
  
  const [pictureURL, setPictureURL] = useState();
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);
  setOptions();

  // Event handler for when the user selects an image
  const handleChange = (event) => {
    setFile(event.target.files[0]);
    handleUpload();
  };
  // console.log(pictureURL);

  function handleUpload() {
      if (!file) {
        alert("Molimo Vas da odaberete sliku")
      }
      const storageRef = ref(storage, `/files/${file.name + v4()}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on("state_changed",
          (snapshot) => { 
          setPercent(Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100));
        },
          (err) => console.log(err),
          () => {
            // download url
            getDownloadURL(uploadTask.snapshot.ref)
            .then((url) => {
              console.log(url); 
              setPictureURL(url);
            });
          }
        ); 
    }

  const navigate = useNavigate();

  const onSubmitForm = (e) => {
    e.preventDefault();
    if (chosenCategory == "" || chosenSex == "" || chosenSubcategory == "") {
      window.alert("Odaberite spol, kategoriju i podkategoriju");
    } else if (pictureURL == null) {
      window.alert("Odaberite sliku za donaciju");
    } else {
      axios({
        method: "post",
        url: `/api/item`,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
        data: {
          productName: productName,
          itemState: itemState,
          productionYear: productionYear,
          productBrand: productionBrand,
          forAge: forAge,
          forSex: chosenSex,
          category: chosenCategory,
          subcategory: subcategoryName,
        },
      })
        .then((response) => {
          console.log(response.data);
          let user = JSON.parse(localStorage.getItem("user"));
          let item = response.data;
          axios({
            method: "post",
            url: `/api/donation`,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
            data: {
              donationName,
              pictureURL,
              handoverLocation,
              user,
              item,
            },
          })
            .then((response) => {
              console.log(response.data);
              navigate("/base")
              toast.success("Donacija poslana na odobravanje");
            })
            .catch((err) => {
              console.log(err);
              toast.error("Došlo je do greške");
            });
        })
        .catch((err) => {
          console.log(err);
          toast.error("Došlo je do greške");
        });
    }
  };

  return (
    <React.Fragment>
      <form onSubmit={onSubmitForm}>
        <div className="frame">
          <input
            value={donationName}
            onChange={(e) => setDonatioName(e.target.value)}
            type="text"
            name="donationName"
            id="donationName"
            placeholder="Naziv donacije"
            className="inputFrame"
            required={true}></input>
        </div>

        <div className="frame">
          <input
            value={handoverLocation}
            onChange={(e) => setHandoverLocation(e.target.value)}
            type="text"
            name="handoverLocation"
            id="handoverLocation"
            placeholder="Lokacija preuzimanja"
            className="inputFrame"
            required={true}></input>
        </div>

        <div>
          <input type="file" accept="image/*" onChange={handleChange} />
          <p style={{display:percent=="100"?"none":""}}>{percent} "% done"</p>
          <button onClick={handleUpload} type="button">Upload slike</button>
        </div>
          {percent=="100"?<img src={pictureURL} />:""}
          {/* <img src={pictureURL} /> */}
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
                    console.log(subcategoryName);
                  }
                }
                console.log(e.value);
              }}
              placeholder="Potkategorije"
              required={true}
            />
          </div>
          <button type="submit">Spremi donaciju</button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default DonationForm;
