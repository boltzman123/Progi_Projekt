import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/components/Buttons.css"

class PrijavaBtn extends Component {
  render() {
    return (
      <React.Fragment>
            <Link to={"/login"}>
                <button type="button" className='gumbic tamniji'>
                  Prijava
                </button>
              </Link>
      </React.Fragment>
    );
  }
}

export default PrijavaBtn;
