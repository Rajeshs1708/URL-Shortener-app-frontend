import React, { useState } from 'react';
import './NewPassword.css';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function NewPassword() {


  const navigate = useNavigate()

  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      if (otp && password) {
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/submit-otp`, { otp: otp, password: password })
          .then(res => {
            console.log(res.data);
            if (res.data.code === 200) {
              const notify = () => toast.success(`*${res.data.message}*`, { theme: 'colored' });
              notify()
              setError(res.data.message)
              setTimeout(() => {
                navigate('/')
              }, 3000)
            }else{
              const notify = () => toast.error(`*${res.data.message}*`, { theme: 'colored' });
              notify()
            }
          })
          .catch(err => {
            console.log(err);
            const notify = () => toast.error(`*${err.response.data.message}*`, { theme: 'colored' });
            notify()
          })

      } else {
        const notify = () => toast.error("* Invalid input *", { theme: 'colored' });
        notify()
      }
    } catch (err) {
      console.log("Error...", err);
    }
  }

  return (
    <div className='newPassword'>
      <div className='newPassword__container'>
        <form onSubmit={handleSubmit}>
        {error && <p className='alert alert-success'>{error}</p>}
          <h1>Set New Password</h1>
          <div className="mb-3">
            <label htmlFor="exampleInputOtp" className="form-label">OTP</label>
            <input value={otp} onChange={e => setOtp(e.target.value)} type="otp" className="form-control" id="exampleInputOtp" aria-describedby="emailHelp" placeholder='Enter your OTP' />
          </div>

          <div className="mb-3">
            <label htmlFor="exampleInputPassword" className="form-label">New Password</label>
            <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="form-control" id="exampleInputPassword" aria-describedby="emailHelp" placeholder='Enter your New Password' />
          </div>
          <button className="btn btn-primary">Submit</button>
          <ToastContainer
                        autoClose={3000}
                        theme="colored"
                    />
        </form>
      </div>
    </div>
  )
}

export default NewPassword
