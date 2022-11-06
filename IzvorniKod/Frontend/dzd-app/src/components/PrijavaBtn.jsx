import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/style.css"

class PrijavaBtn extends Component {
  render() {
    return (
      <React.Fragment>
            <Link to={"/login"}>
                <button className='gumbic tamniji'>
                  Prijava
                </button>
              </Link>
      </React.Fragment>
    );
  }
}

export default PrijavaBtn;
