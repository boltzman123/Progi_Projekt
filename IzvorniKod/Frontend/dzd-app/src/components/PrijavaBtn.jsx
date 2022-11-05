import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/components/PrijavaBtn.css"

class PrijavaBtn extends Component {
  state = {};
  render() {
    return (
      <React.Fragment>
            <Link to={"/login"}><button id='prijavaBtn'>Prijava</button></Link>
      </React.Fragment>
    );
  }
}

export default PrijavaBtn;
