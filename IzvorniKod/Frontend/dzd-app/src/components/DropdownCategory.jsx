import React, { Component, useState, useEffect } from "react";
import { createPopper } from "@popperjs/core";
import Dropdown from "react-dropdown";
import "react-dropdown/style.css";
import axios from "axios";

function DropdownCategory() {
  const [chosen, setChosen] = useState("");
  var array = [];

  useEffect(() => {
    axios({
      method: "get",
      url: "/api/category",
    }).then((response) => {
      var pod = Object.values(response.data);
      for (let i = 0; i < pod.length; ++i) {
        if (pod[i].categoryName != array[i]) {
          array.push(pod[i].categoryName);
        }
      }
    });
  });

  return (
    <React.Fragment>
      <div style={{ width: 200 }}>
        <Dropdown
          options={array}
          value={chosen}
          onChange={(e) => {
            setChosen(e.value)            
          }}
          placeholder="Kategorije"
        />
      </div>

    </React.Fragment>
  );
}
export default DropdownCategory;
