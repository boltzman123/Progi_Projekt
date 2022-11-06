import React, { Component } from 'react';
import { Link } from "react-router-dom";
import "../style/style.css"


class LoginAll extends Component {

    render() { 
        return (
            <React.Fragment>
                <form>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder='Upisite email' 
                    required="true"
                    className="okvir"
                    />
                </form>

                <form>
                    <input type="text"
                        name="name"
                        placeholder='Upisite password'
                        className="okvir"
                        required="true"
                    />
                </form>

                <Link to={"/login"}>
                    <button className='gumbic tamniji'>
                        Logiraj se
                    </button>
                </Link>
                {/* <p>Nemas profil?</p>

                <Link to={"/registracija"}>
                    <button className='gumbic tamniji'>
                        Registriraj se
                    </button>
                </Link> */}

                {/* <p>{ email }</p>
                <p>{ password }</p> */}

            </React.Fragment>
        );
    }
}
 
export default LoginAll;