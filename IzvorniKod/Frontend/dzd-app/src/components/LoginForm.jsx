import React, { useState } from 'react';
import axios from 'axios';
import "../style/style.css"


export const LoginAll = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();

        const data = {
            email: email,
            password: pass
        };

        //console.log(JSON.stringify(data));

        const options = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        };

        axios.get(`/users/${email}`,options)
        .then(response => response.data)
        .then(data => console.log(data));
    }


    return (
        <>
                <form onSubmit={onSubmit}>
                    <div>
                        <label>Upišite email</label>
                        </div>
                    <div>
                        <input 
                            value={email} onChange={ (e) => setEmail(e.target.value)}
                            type="email" 
                            name="email" 
                            id="email"
                            placeholder='upisite.email@gmail.com' 
                            className="okvir"
                            required={true}
                        />
                    </div>

                    <div>
                        <label>Upišite password</label>
                    </div>
                    <div>
                        <input 
                            value={pass} onChange={ (e) => setPass(e.target.value)}
                            type="password"
                            name="pass"
                            id="pass"
                            placeholder='Upisite password'
                            className="okvir"
                            required={true}
                        />
                    </div>

                    <div>
                        <button className='gumbic tamniji' type="submit">
                            Logiraj se
                        </button>
                    </div>

                </form>
        </>
    );
    }
 
export default LoginAll;