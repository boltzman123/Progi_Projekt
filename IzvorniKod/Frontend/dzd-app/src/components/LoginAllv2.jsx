import React, { useState } from 'react';
import "../style/style.css"


export const LoginAll = () => {

    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(email);
        console.log(pass);
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                {/* <label htmlFor="email">Email</label> */}
                <input 
                    value={email} onChange={ (e) => setEmail(e.target.value)}
                    type="email" 
                    name="email" 
                    id="email"
                    placeholder='upisite.email@gmail.com' 
                    className="okvir"
                />

                {/* <label htmlFor="pass">Password</label> */}
                <input 
                    value={pass} onChange={ (e) => setPass(e.target.value)}
                    type="password"
                    name="pass"
                    id="pass"
                    placeholder='Upisite password'
                    className="okvir"
                />
            
                <div className="buttons">
                    <button className='gumbic tamniji' type="submit">
                        Logiraj se
                    </button>
                </div>
            </form>
        </>
    );
    }
 
export default LoginAll;