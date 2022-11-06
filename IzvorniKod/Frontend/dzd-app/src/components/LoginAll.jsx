import React, { Component, useState } from 'react';
import { Link } from "react-router-dom";
import "../style/style.css"


class LoginAll extends Component {

    // const [email, setEmail] = useState('');
    // const [pass, setPass] = useState('');

    render() { 
        return (
            <React.Fragment>
                <form>
                    <input 
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder='upisite.email@gmail.com' 
                    required="true"
                    className="okvir"
                    />

                    <input 
                        type="password"
                        name="password"
                        id="password"
                        placeholder='Upisite password'
                        className="okvir"
                        required="true"
                    />
                </form>

                <button className='gumbic tamniji'>
                    Logiraj se
                </button>

            </React.Fragment>
        );
    }
}
 
export default LoginAll;