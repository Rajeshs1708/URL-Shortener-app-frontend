import axios from 'axios';
import React, { useState } from 'react';
import './Navbar.css';
import { useNavigate } from "react-router-dom";


function Navbar() {

    const navigate = useNavigate();
    const [error, setError] = useState('')

    const handleLogout = () => {
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/api/signout`)
                .then(res => {
                    if (res) {
                        setError(res.data.message)
                        localStorage.removeItem("TOKEN");
                        setTimeout(() => {
                            navigate('/')
                        }, 1000)

                    }
                })
                .catch(err => setError(err.response.data.message))

        } catch (err) {
            console.log("Error...", err);
        }
    }
    return (
        <>
            <div className='row Navbar'>
                <div className="col-md-9 logo">
                    <h1 className="display-3 text-center">URL Shortner App</h1>
                </div>
                <div className='col-md-2 Navbar__logout'>
                    <h5 className='text-center' style={{ borderBottom: "1px solid red", paddingBottom: "5px" }}>User Profile</h5>
                    <h6>Name: {localStorage.getItem("NAME")}</h6>
                    <h6>E-mail: {localStorage.getItem("EMAIL")}</h6>
                    <button onClick={handleLogout} className='btn btn-danger'>Logout</button>
                </div>
            </div>

            <p className='Navbar__message'>{error}</p>
            <br />


        </>
    )
}

export default Navbar
