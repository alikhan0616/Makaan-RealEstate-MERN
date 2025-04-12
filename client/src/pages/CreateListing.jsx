import { useState } from "react"
import {app} from '../firebase'
import  { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'

export default function CreateListing() {
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    imageUrls: [],

  })
  const [imageUploadError, setImageUplaodError] = useState(false)
  const [uploading, setUploading] = useState(false)
  console.log(formData);
  

  const handleFileUpload = ()=> {
    setUploading(true);
    if(files.length > 0 && files.length + formData.imageUrls.length  < 7){
      const promises = [];
      for(let i = 0 ; i < files.length ; i++){
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({...formData, imageUrls: formData.imageUrls.concat(urls)})
        setImageUplaodError(false)
        setUploading(false)
      }).catch((error) => {
        setImageUplaodError("Image upload failed (2mb max per image)")
        setUploading(false)
      })
    } else {
      setImageUplaodError("You can only upload 6 images per listing!")
      setUploading(false)
    }
  }
  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app)
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file)
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress)
        },
        (error)=> {
          reject(error);
        },
        ()=> {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          resolve(downloadURL)}
      )}
      )
    })
  }
  const handleRemoveImage = (index) =>{
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index)
    })
  }
  return (
    <main className='p-4 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className="flex flex-col flex-1 gap-4">
        <input type="text" placeholder='Name' id='name' className='p-3  bg-amber-50 rounded-lg border border-gray-400' maxLength='64' minLength='10' required />
        <textarea type="text" placeholder='Description' id='description' className='p-3  bg-amber-50 rounded-lg border border-gray-400' required />
        <input type="text" placeholder='Address' id='address' className='p-3  bg-amber-50 rounded-lg border border-gray-400' maxLength='64' minLength='10' required />
        <div className="flex flex-wrap gap-6 my-2">
          <div className="flex gap-2">
            <input type="checkbox" id='sale' className='w-5' />
            <span>Sell</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id='rent' className='w-5' />
            <span>Rent</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id='parking' className='w-5' />
            <span>Parking Spot</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id='furnished' className='w-5' />
            <span>Furnished</span>
          </div>
          <div className="flex gap-2">
            <input type="checkbox" id='offer' className='w-5' />
            <span>Offer</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-7">
          <div className="flex items-center gap-3">
            <input min='1' max='10' id='bedrooms' type="number" className='border border-gray-400 w-20 bg-amber-50  rounded-lg p-3'/>
            <span>Beds</span>
          </div>
          <div className="flex items-center gap-3">
            <input min='1' max='10' id='bathrooms' type="number" className='w-20 bg-amber-50 border border-gray-400 rounded-lg p-3'/>
            <span>Baths</span>
          </div>
          <div className="flex items-center gap-3">
            <input min='1' id='regularPrice' type="number" className='w-35 bg-amber-50 border border-gray-400 rounded-lg p-3'/>
            <div className='flex flex-col items-center'>
            <span>Regular Price</span>
            <p className='text-xs'>{'(PKR / Month)'}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <input min='1' id='discountedPrice' type="number" className='w-35 bg-amber-50 border border-gray-400 rounded-lg p-3'/>
            <div className='flex flex-col items-center'>
            <span>Discounted Price</span>
            <p className='text-xs'>{'(PKR / Month)'}</p>
            </div>
          </div>
        </div>
        </div>
        <div className="flex flex-col flex-1 gap-4">
          <p className='font-semibold'>Image:
          <span className='ml-2 inline font-normal text-gray-700'>First image is going to be the cover (max 6)</span>
        </p>
        <div className="flex gap-4">
          <input onChange={(e)=> setFiles(e.target.files)} type="file" id='images' accept='image/*' multiple className='border border-gray-400 bg-amber-50 p-3' />
          <button disabled={uploading} onClick={handleFileUpload} type='button' className='cursor-pointer border uppercase border-green-700 rounded-sm p-3 hover:shadow-lg disabled:opacity-75 text-green-700'>{uploading ? "uploading..." : "upload"}</button>
        </div>
        <p className="text-red-700 text-sm">{imageUploadError ? imageUploadError : ""}</p>
        {
          formData.imageUrls.length > 0 && formData.imageUrls.map((img, index) => {
            return(
              <div key={img} className="flex justify-between p-3 border border-gray-300 items-center">
                <img src={img} alt="listing image" className="rounded-lg w-20 h-20 object-contain" />
                <button type="button" onClick={() => handleRemoveImage(index)} className="p-3 text-red-700 uppercase cursor-pointer hover:opacity-75">Delete</button>
              </div>
            )
          })
        }
        <button className='p-3 bg-slate-800 rounded-lg uppercase text-white hover:opacity-95 disabled:opacity-75'>Create Listing</button>
        </div>
        
      </form>
    </main>
  )
}
