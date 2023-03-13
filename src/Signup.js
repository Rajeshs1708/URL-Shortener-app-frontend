import React, { useState } from 'react'
import './Signup.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

function Signup () {
  const navigate = useNavigate()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    try {
      if (name && email && password) {
        axios
          .post(`${process.env.REACT_APP_BASE_URL}/api/signup`, {
            name: name,
            email: email,
            password: password
          })
          .then(res => {
            if (res) {
              setError(res.data.message);
              setTimeout(() => {
                navigate('/')
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
    <div className='signup'>
      <div className='signup__container'>
        <form onSubmit={handleSubmit}>
          {error && <p className='alert alert-success'>{error}</p>}
          <p className='display-4 text-center'>Signup</p>
          <div className='mb-3'>
            <input
              value={name}
              onChange={e => setName(e.target.value)}
              type='name'
              className='form-control'
              id='exampleInputName1'
              placeholder='Enter your Name'
            />
          </div>

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
              type='Password'
              className='form-control'
              id='exampleInputPassword1'
              placeholder='Enter your Password'
            />
          </div>
          <button type='submit' className='btn btn-primary'>
            Signup
          </button>
          <ToastContainer hideProgressBar={true} />
        </form>
      </div>
    </div>
  )
}

export default Signup
