import { useSelector, useDispatch } from 'react-redux'
import { useRef, useState, useEffect } from 'react';
import  { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { Link } from 'react-router-dom'
import { app } from '../firebase.js'
import { updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOutStart,
  signOutSuccess,
  signOutFailure} from '../redux/user/userSlice.js';

export default function Profile() {
  const {currentUser, loading, error} = useSelector(state => state.user);
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({})
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const [showListingsError, setShowListingsError] = useState(false)
  const [showUserListings, setShowUserListings] = useState([])
  const fileRef = useRef(null)
  const dispatch = useDispatch();

  console.log(showUserListings)
  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  }, [file])
  const handleFileUpload = (file) => {
    setFileUploadError(false)
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state changed', 
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePerc(Math.round(progress))
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then
        ((downloadURL) => {
          setFormData({...formData, avatar: downloadURL})
        })
      }
    )
  }
  const handleOnChange = (e) => {
    setFormData({...formData, [e.target.id]: e.target.value})
  }
  const handleOnSubmit = async (e) => {
    e.preventDefault()
    try {
      dispatch(updateUserStart());
      const res = await fetch(`/api/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': "application/json",
        },
        body: JSON.stringify(formData),
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(updateUserFailure(data.message))
        return
      }

      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      setUpdateSuccess(false)
      dispatch(updateUserFailure(error.message))
    }

  }
  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart())
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if(data.success === false){
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignOut = async () => {
    try {
      dispatch(signOutStart())
      const res = await fetch('/api/auth/signout');
      const data = await res.json();
      if(data.success === false){
        dispatch(signOutFailure(data.message));
        return
      }
      dispatch(signOutSuccess(data))
    } catch (error) {
      dispatch(signOutFailure(data.message))
    }
  }
  const handleShowListings = async() => {
    try {
      const res = await fetch(`/api/user/listings/${currentUser._id}`)
      const data = await res.json();
      if(data.success === false){
        setShowListingsError(true)
        return;
      }
      setShowUserListings(data)
    } catch (error) {
      setShowListingsError(true)
    }
  }
  const handleListingDelete = async(listingId) => {
    try {
      const res = await fetch(`/api/listing/delete/${listingId}` , {
        method: "DELETE",
      })
      const data = await res.json();
      if(data.success === false){
        console.log(data.message)
      }
      setShowUserListings((prev) => prev.filter((listing) => listing._id !== listingId))
    } catch (error) {
      console.log("Error occured", error)
    }
  }
  return (
    <div className='max-w-lg mx-auto p-3'>
      <h1 className='font-semibold text-3xl text-center my-7'>Profile</h1>
      <form onSubmit={handleOnSubmit} className='flex flex-col gap-4'>
        <input onChange={(e) => setFile(e.target.files[0])} type='file' ref={fileRef} hidden accept='image/*' />
        <img onClick={() => fileRef.current.click()} className='cursor-pointer rounded-full h-27 w-27 self-center object-cover' src={formData.avatar || currentUser.avatar} alt="profile icon" />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>Error uploading file! (Image must be less than 2 MB'S!)</span>
          ) : (filePerc > 0 && filePerc < 100) ? (
            <span className='text-slate-700'>{`Uploading... ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>File Uploaded Successfully!</span>
          ) : ''}
        </p>
        <input onChange={handleOnChange} className='border-none bg-amber-50 rounded-lg p-3'
         type='text' placeholder='username' id='username' defaultValue={currentUser.username} />
        <input onChange={handleOnChange}  className='border-none bg-amber-50 rounded-lg p-3'
         type='email' placeholder='email' id='email' defaultValue={currentUser.email} />
        <input onChange={handleOnChange} className='border-none bg-amber-50 rounded-lg p-3'
         type='password' placeholder='password' id='password'/>
         <button disabled={loading} className='bg-slate-700 uppercase p-3 text-white border rounded-lg hover:opacity-95 disabled:opacity-70 cursor-pointer'>
          {loading ? "Loading..." : "Update"}
         </button>
         <Link className="text-center bg-green-700 p-3 rounded-lg uppercase text-white hover:opacity-95" to={'/create-listing'}>
          Create Listing
         </Link >
      </form>
      <div className='flex justify-between my-2'>
        <span onClick={handleDeleteAccount} className='text-red-600 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-600 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 my-4'>{error ? error : ""}</p>
      <p className='text-green-700 my-4'>{updateSuccess ? "Profile updated successfully!" : ""}</p>
      <button onClick={handleShowListings} className='cursor-pointer text-green-700 w-full'>Show Listings</button>
      {
        showListingsError && <p className='text-red-700 my-4'>Error showing Listing!</p>
      }
      {showUserListings && showUserListings.length > 0 && 
      <div className="div">
      <h1 className='text-center font-semibold text-2xl my-7 flex flex-col'>Your Listings</h1>
      {
      showUserListings.map((listing) =>
        <div className='gap-4 p-3 my-3 border rounded-lg border-gray-300 flex justify-between items-center' key={listing._id}>
          <Link to={`/listing/${listing._id}`}>
          <img className='w-16 h-16 object-contain' src={listing.imageUrls[0]} alt="cover image" />
          </Link>
          <Link className='text-slate-700 flex-1 hover:underline truncate font-semibold' to={`/listing/${listing._id}`}>
          <p>{listing.name}</p>
          </Link>
          <div className="flex flex-col">
            <button onClick={() => handleListingDelete(listing._id)} className='cursor-pointer text-red-700 uppercase'>Delete</button>
            <button className='cursor-pointer text-green-700 uppercase'>Edit</button>
          </div>
        </div>
      )}
      </div>
      }
    </div>
  )
}
