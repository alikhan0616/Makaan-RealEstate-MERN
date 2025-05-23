import React from 'react'
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import { app } from '../firebase.js';
import { useDispatch } from 'react-redux';
import { signInSuccess } from '../redux/user/userSlice.js';
import { useNavigate } from 'react-router-dom'

export default function OAuth() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleGoogleClick = async () => {
        try {
            const provider = new GoogleAuthProvider();
            const auth = getAuth(app)

            const result = await signInWithPopup(auth, provider)
            
            const res = await fetch('/api/auth/google', {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: result.user.displayName,
                    email: result.user.email,
                    photo: result.user.photoURL})
            })
            const data = await res.json()
            dispatch(signInSuccess(data))
            navigate('/')
        } catch (error) {
            console.log("Couldn't use google authorization", error);
            
        }
    }
  return (
      <button onClick={handleGoogleClick} type='button' className='bg-red-700 uppercase p-3 text-white border rounded-lg hover:opacity-95 disabled:opacity-70 cursor-pointer'>Continue with google</button>
  )
}
