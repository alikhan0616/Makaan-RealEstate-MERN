import React, { useState } from 'react'
import {Link, useNavigate} from "react-router-dom"
import OAuth from '../components/OAuth'

export default function SignUp() {

  const [formData, setFormData] = useState({})
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false) 
  const navigate = useNavigate()


  const handleSubmit = async (e)=> {
    e.preventDefault()
    try {
      setLoading(true);
      const res = await fetch('/api/auth/signup', {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if(data.success === false){
        setError(data.message);
        setLoading(false);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in')
    } catch (error) {
      setLoading(false);
      setError(error.message)
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
      <h1 className='font-semibold text-3xl text-center my-7'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="text" placeholder='username' 
        className='border-none bg-amber-50 rounded-lg p-3' id="username" onChange={handleChange}
        />
        <input type="email" placeholder='email' 
        className='border-none bg-amber-50 rounded-lg p-3' id="email" onChange={handleChange}
        />
        <input type="password" placeholder='password' 
        className='border-none bg-amber-50 rounded-lg p-3' id="password" onChange={handleChange}
        />
        <button disabled={loading} className='bg-slate-700 uppercase p-3 text-white border rounded-lg hover:opacity-95 disabled:opacity-70 cursor-pointer'>
          {loading ? "loading..." : "Sing Up"}
        </button>
        <OAuth />
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Already have an account?</p>
        <Link to="/sign-in">
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  )
}
