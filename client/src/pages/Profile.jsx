import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser} = useSelector(state => state.user);
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='cursor-pointer rounded-full h-27 w-27 self-center' src={currentUser.avatar} alt="profile icon" />
        <input className='border-none bg-amber-50 rounded-lg p-3'
         type='text' placeholder='username' id='username'/>
        <input className='border-none bg-amber-50 rounded-lg p-3'
         type='email' placeholder='email' id='email'/>
        <input className='border-none bg-amber-50 rounded-lg p-3'
         type='text' placeholder='password' id='password'/>
         <button className='bg-slate-700 uppercase p-3 text-white border rounded-lg hover:opacity-95 disabled:opacity-70 cursor-pointer'>
          Update
         </button>
         <button className='bg-green-700 uppercase p-3 text-white border rounded-lg hover:opacity-95 disabled:opacity-70 cursor-pointer'>
          Create Listing
         </button>
      </form>
      <div className='flex justify-between my-2'>
        <span className='text-red-600 cursor-pointer'>Delete Account</span>
        <span className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}
