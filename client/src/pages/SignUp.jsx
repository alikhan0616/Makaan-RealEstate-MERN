import React from 'react'
import {Link} from "react-router-dom"

export default function SignUp() {
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>Sign Up</h1>
      <form className='flex flex-col gap-4'>
        <input type="text" placeholder='username' 
        className='border-none bg-amber-50 rounded-lg p-3'
        />
        <input type="email" placeholder='email' 
        className='border-none bg-amber-50 rounded-lg p-3'
        />
        <input type="password" placeholder='password' 
        className='border-none bg-amber-50 rounded-lg p-3'
        />
        <button className='bg-slate-700 uppercase p-3 text-white border rounded-lg hover:opacity-95 disabled:opacity-70 cursor-pointer'>
          Sign Up
        </button>
      </form>
      <div className='flex gap-2 mt-4'>
        <p>Already have an account?</p>
        <Link to="/sign-in">
        <span className='text-blue-700'>Sign In</span>
        </Link>
      </div>
    </div>
  )
}
