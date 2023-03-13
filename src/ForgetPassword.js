import React, { useState } from 'react'
import './ForgetPassword.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function ForgetPassword () {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    try {
      if (email) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/send-otp`, {
            email: email
          })
          .then(res => {
            console.log(`OTP : ${res.data.otp}`)
            if (res.data.code === 200) {
              const notify = () =>
                toast.success(`*${res.data.message}*`, { theme: 'colored' })
              notify()
              setError(`${res.data.message}    ${res.data.otp}`)
              setTimeout(() => {
                navigate('/newPassword')
              }, 4000)
            } else {
              const notify = () =>
                toast.error(`*${res.data.message}*`, { theme: 'colored' })
              notify()
            }
          })
          .catch(err => {
            console.log(err)
            const notify = () =>
              toast.error(`*${err.response.data.message}*`, {
                theme: 'colored'
              })
            notify()
            setError(`*${err.response.data.message}*`)
          })
      } else {
        const notify = () =>
          toast.error('* Invalid input *', { theme: 'colored' })
        notify()
      }
    } catch (err) {
      setError(' Input Error')
      console.log('Error...', err)
    }
  }

  return (
    <div className='forgetPassword'>
      <div className='forgetPassword__container'>
        <form onSubmit={handleSubmit}>
          {error && <p className='alert alert-success'>{error}</p>}
          <h1>Forget Password</h1>
          <div className='mb-3'>
            <label htmlFor='exampleInputEmail1' className='form-label'>
              Email address
            </label>
            <input
              value={email}
              onChange={e => setEmail(e.target.value)}
              type='email'
              className='form-control'
              id='exampleInputEmail1'
              aria-describedby='emailHelp'
              placeholder='Enter your Email'
            />
            <div id='emailHelp' className='form-text'>
              We'll never share your email with anyone else.
            </div>
          </div>
          <button className='btn btn-primary'>Send OTP</button>
          <ToastContainer autoClose={3000} theme='colored' />
        </form>
      </div>
    </div>
  )
}

export default ForgetPassword
