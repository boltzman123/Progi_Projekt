import React, { useState, useEffect } from "react";
import axios from "axios";
import { useFetcher, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Dropdown from "react-dropdown";
import storage from "../firebaseConfig.js";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import DonationFormCSS from "../style/components/DonationForm.module.css";
import HomeCSS from "../style/pages/Home.module.css"

import {
  TextField,
  Select,
  Button,
  FormControl,
  FormLabel,
  Typography,
} from "@mui/material";
import {
  RadioGroup,
  FormControlLabel,
  Radio,
  Grid,
  InputLabel,
  MenuItem,
  Box,
  Container,
} from "@mui/material";

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
  let [arraySub, setArySub] = useState([]);
  let [value, setValue] = useState("");

  const [pictureURL, setPictureURL] = useState();
  const [file, setFile] = useState("");
  const [percent, setPercent] = useState(0);

  const ageRange = [...Array(16).keys()];
  const now = new Date().getUTCFullYear();
  const yearRange = Array(now - (now - 50))
    .fill("")
    .map((v, idx) => now - idx);

  setOptions();

  useEffect(() => {
    setOptions(chosenCategory, arraySub, setArySub);
    setCategoryName(aryCat);
    console.log(categoryName);

    // console.log("ovdje");
  }, []);

  // Event handler for when the user selects an image
  const handleChange = (event) => {
    setFile(event.target.files[0]);
    handleUpload();
  };
  // console.log(pictureURL);

  function handleUpload() {
    if (!file) {
      alert("Molimo Vas da odaberete sliku");
    }
    const storageRef = ref(storage, `/files/${file.name + v4()}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        setPercent(
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (err) => console.log(err),
      () => {
        // download url
        getDownloadURL(uploadTask.snapshot.ref).then((url) => {
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
      console.log(subcategoryName);
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
            url: `/api/donation/createDonation`,
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
              navigate("/base");
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
  const checkSubInCat = (cat) => {
    let subs = mapCat.get(cat);
    if (!subs.includes(chosenSubcategory.subcategoryName)) {
      for (let i = 0; i < privremeniAry.length; ++i) {
        if (privremeniAry[i].subcategoryName == subs[0]) {
          setChosenSubCategory(privremeniAry[i]);
          setSubcategoryName(privremeniAry[i]);
        }
      }
    }
  };

  return (
    <React.Fragment>
      <div className={HomeCSS.title} style={{fontSize:30}}>Kreiraj svoju donaciju</div>
      <form className={DonationFormCSS.dForm} onSubmit={onSubmitForm}>
        <div className="lDio">
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
              value={handoverLocation}
              onChange={(e) => setHandoverLocation(e.target.value)}
              type="text"
              name="handoverLocation"
              id="handoverLocation"
              placeholder="Lokacija preuzimanja"
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
              <FormControl fullWidth>
                <FormLabel id="spol">Predviđeni spol</FormLabel>
                <RadioGroup
                  name="spol-radio-buttons-group"
                  value={chosenSex}
                  required
                  onChange={(e) => setChosenSex(e.target.value)}>
                  <div style={{ display: "flex" }}>
                    <FormControlLabel
                      value="z"
                      control={<Radio />}
                      label="Žensko"
                    />
                    <FormControlLabel
                      value="m"
                      control={<Radio />}
                      label="Muško"
                    />
                  </div>
                </RadioGroup>
              </FormControl>
            </div>



          <div className={DonationFormCSS.odabiri}>

          <div className={DonationFormCSS.r}>

          <div className="frame" style={{ width: "200px" }}>
              <FormControl fullWidth>
                <InputLabel>Predviđena dob</InputLabel>
                <Select
                  labelId="dob-select-label"
                  id="dob-select"
                  value={forAge}
                  label="dob"
                  required
                  MenuProps={{
                    PaperProps: { sx: { maxHeight: 175 } },
                  }}
                  onChange={(e) => setforAge(e.target.value)}>
                  {ageRange.map((ageSelect) => {
                    return (
                      <MenuItem key={ageSelect} value={ageSelect}>
                        {ageSelect}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>

            <div className="frame" style={{ width: "200px" }}>
              <FormControl fullWidth>
                <InputLabel>Godina proizvodnje</InputLabel>
                <Select
                  labelId="year-select-label"
                  id="year-select"
                  value={productionYear}
                  label="productionYear"
                  required
                  MenuProps={{
                    PaperProps: { sx: { maxHeight: 175 } },
                  }}
                  onChange={(e) => setProductionYear(e.target.value)}>
                  {yearRange.map((yearSelect) => {
                    return (
                      <MenuItem key={yearSelect} value={yearSelect}>
                        {yearSelect}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              </div>
              

              </div>
          
              <div className={DonationFormCSS.r}>
            <div className="frame">
              <div style={{ width: 225 }}>
                <Dropdown
                  menuClassName={DonationFormCSS.dropdown}
                  className={DonationFormCSS.box}
                  options={aryCat}
                  value={chosenCategory.categoryName}
                  onChange={(e) => {
                    let obj = { categoryName: e.value };
                    setChosenCategory(obj);
                    setCategoryName(e.value);
                    let values = mapCat.get(e.value);
                    setArySub([].concat(values));
                    checkSubInCat(e.value);
                  }}
                  placeholder="Kategorije"
                  required={true}
                />
              </div>
            </div>

            <div className="frame">
              <div style={{ width: 225, height: 27 }}>
                <Dropdown
                  menuClassName={DonationFormCSS.dropdown}
                  options={arraySub}
                  value={chosenSubcategory.subcategoryName}
                  onChange={(e) => {
                    for (let i = 0; i < privremeniAry.length; ++i) {
                      if (e.value == privremeniAry[i].subcategoryName) {
                        let obj = privremeniAry[i];
                        setChosenSubCategory(obj);
                        setSubcategoryName(obj);
                      }
                    }
                  }}
                  placeholder="Potkategorije"
                  required={true}
                />
              </div>
            </div>


            </div>

        

          


       

          
           
          </div>
        </div>

        <div className="dDio">
          <div>
            <input type="file" accept="image/*" onChange={handleChange} />
            <p style={{ display: percent == "100" ? "none" : "" }}>
              {percent} "% done"
            </p>
            <button onClick={handleUpload} type="button">
              Upload slike
            </button>
          </div>
          {percent == "100" ? <img src={pictureURL} /> : ""}
          {/* <img src={pictureURL} /> */}

          <button type="submit">Spremi donaciju</button>
        </div>
      </form>
    </React.Fragment>
  );
};
export default DonationForm;
