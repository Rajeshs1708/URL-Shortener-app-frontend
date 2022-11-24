import React, { useState } from 'react';
import './Signup.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function Signup() {

    const navigate = useNavigate()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault();
        try {

            if (name && email && password) {
                axios.post(`${process.env.REACT_APP_BASE_URL}/api/signup`, { name: name, email: email, password: password })
                    .then(res => {
                        if (res) {
                            const notify = () => toast.success(`*${res.data.message}*`, { theme: 'colored'});
                            notify()
                            // setError(res.data.message);
                            setTimeout(() => {
                                navigate('/')
                            }, 3000)
                        }
                    })
                    .catch(err => {
                        const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
                        notify()
                    })


            } else {
                const notify = () => toast.error("Invalid input", { theme: 'colored' });
                notify()
            }
        } catch (err) {
            const notify = () => toast.error(" Input Error", { theme: 'colored' });
            notify()
            console.log("Error...", err);
        }
    }

    return (
        <div className='signup'>

            <div className='signup__container'>
                <form onSubmit={handleSubmit}>
                    <p className='signup__containerError'>{error}</p>
                    <h1>Signup</h1>
                    <div className="mb-3">
                        <label htmlFor="exampleInputName1" className="form-label">Name</label>
                        <input value={name} onChange={e => setName(e.target.value)} type="name" className="form-control" id="exampleInputName1" placeholder='Enter your Name' />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your Email' />
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your Password' />
                    </div>

                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
                    <button type="submit" className="btn btn-primary">Signup</button>
                    <ToastContainer hideProgressBar={true}/>

                </form>

            </div>

        </div>
    )
}

export default Signup
