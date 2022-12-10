import React, { Component } from "react";
import { Link } from "react-router-dom";
import "../style/components/Buttons.css"

class DjecaBtn extends Component {
  render() {
    return (
      <React.Fragment>
            <Link to={"/djeca"}>
                <button type="button" className='gumbic tamniji'>
                  Pregled djece
                </button>
              </Link>
      </React.Fragment>
    );
  }
}

export default DjecaBtn;
