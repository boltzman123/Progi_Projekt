import React, { useState } from 'react';
import "../style/style.css"
import "../style/pages/Registracija.css"

const RegistracijaForm = () => {
    const [ime, setIme] = useState('');
    const [prezime, setPrezime] = useState('');
    const [mjesto, setMjesto] = useState('');
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');

    const onSubmit = (e) =>{
        e.preventDefault();

        const data = {
            ime: ime,
            prezime: prezime,
            mjesto: mjesto,
            email: email,
            password: pass
        };

        console.log(JSON.stringify(data));

        const options = {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        };

        return fetch("/registracija", options);
    }

    return ( 
        <React.Fragment>
            <form onSubmit={ onSubmit }>
                <div className="registerform">
                    <div>
                        <div>
                            <label>Ime</label>
                        </div>
                        <input 
                            value={ime} type="text" name="ime" id="ime" 
                            placeholder="Pero" className='okvir'
                            onChange={ (e) => setIme(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <label>Prezime</label>
                        </div>
                        <input 
                            value={prezime} type="text" name="prezime" id="prezime" 
                            placeholder="Perić" className='okvir'
                            onChange={ (e) => setPrezime(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <label>Mjesto i grad</label>
                        </div>
                        <input 
                            value={mjesto} type="text" name="mjesto" id="mjesto" 
                            placeholder="Ulica Perića, Perkovci" className='okvir'
                            onChange={ (e) => setMjesto(e.target.value)}
                        />
                    </div>
                    <div>
                        <div>
                            <label>Email</label>
                        </div>
                        <input 
                            value={email} type="email" name="email" id="email" 
                            placeholder="peroperic@email.com" className='okvir'
                            onChange={ (e) => setEmail(e.target.value)}
                        />    
                    </div>
                    <div>
                        <div>
                            <label>Password</label>
                        </div>
                        <input 
                            value={pass} type="password" name="pass" id="pass"  
                            className='okvir'
                            onChange={ (e) => setPass(e.target.value)}
                        />    
                    </div>
                    <button type='submit' className='gumbic tamniji'>Registriraj se</button>
                </div>
            </form>
        </React.Fragment>
    );
}
 
export default RegistracijaForm;