import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Login () {
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    try {
      if (email && password) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/signin`, {
            email: email,
            password: password
          })
          .then(res => {
            if (res) {
              setError(`Welcome Mrs/Mr.${res.data.user.name}`)
              localStorage.setItem('TOKEN', res.data.token)
              localStorage.setItem('NAME', res.data.user.name)
              localStorage.setItem('EMAIL', res.data.user.email)
              setTimeout(() => {
                navigate('/profile')
              }, 3000)
            }
          })
          .catch(err => {
            const notify = () =>
              toast.error(`*${err.response.data.message}*`, {
                theme: 'colored'
              })
            notify()
          })
      } else {
        const notify = () => toast.error('Invalid input', { theme: 'colored' })
        notify()
      }
    } catch (err) {
      const notify = () => toast.error(' Input Error', { theme: 'colored' })
      notify()
      console.log('Error...', err)
    }
  }

  return (
    <div className='login'>
      <div className='login__container'>
        <form onSubmit={handleSubmit}>
          {error && <p className='alert alert-success'>{error}</p>}
          <p className='display-4 text-center'>Login</p>
          <div className='mb-3'>
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

          <div className='mb-3'>
            <input
              value={password}
              onChange={e => setPassword(e.target.value)}
              type='password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Enter your Password'
            />
          </div>
          <p className='text-center'>
            <Link to='/forgetPassword'>Forget Password</Link>
          </p>

          <button className='btn btn-primary'>Login</button>
          <ToastContainer autoClose={3000} theme='colored' />

          <p className='text-center'>
            Don't have an account ? <Link to='/signup'>Signup</Link>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
