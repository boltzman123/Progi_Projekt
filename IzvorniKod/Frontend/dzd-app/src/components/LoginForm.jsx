import React, { useState,useEffect } from 'react';
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

        console.log(JSON.stringify(data));

        getUsersByEmail(email);

        const options = {
            method: "GET",
            headers: {
                'Authorization': 'Basic ' + (email + ":"),
                "Content-Type":"application/json",
                'Accept': 'application/json',
                "Access-Control-Allow-Origin": "http://localhost:8080"
            }
            // body: JSON.stringify(data)
        };

        // let response = fetch("http://localhost:8080/users/xd@gmail.com",options)
        // .then(response => response.json())
        // .then(json => console.log(json));
        // console.log(response);
        return response;
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
 
function getUsersByEmail(email){
    const USER_API_BASE_URL = `http://localhost:8080/users/${email}`;
    return axios.get(USER_API_BASE_URL);
}


export default LoginAll;