import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'
import { signInStart, signInSuccess, signInFailed } from '../redux/user/userSlice.js'
import OAuth from '../components/OAuth.jsx'

export default function SignIn() {

  const [formData, setFormData] = useState({})
  const { loading, error } = useSelector((state) => state.user)
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSubmit = async (e)=> {
    e.preventDefault()
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        dispatch(signInFailed(data.message))
        return;
      }
      dispatch(signInSuccess(data))
      navigate('/')
    } catch (error) {
      dispatch(signInFailed(error.message))
    }
  }

  const handleChange = (e)=> {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' 
        className='border-none bg-amber-50 rounded-lg p-3' id="email" onChange={handleChange}
        />
        <input type="password" placeholder='password' 
        className='border-none bg-amber-50 rounded-lg p-3' id="password" onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 uppercase p-3 text-white border rounded-lg hover:opacity-95 disabled:opacity-70 cursor-pointer'>
          {loading ? "loading..." : "Sing In"}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Don't have an account?</p>
        <Link to="/sign-up">
        <span className='text-blue-700'>Sign Up</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}
