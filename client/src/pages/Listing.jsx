import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'
import {useSelector} from 'react-redux'
import { FaBath, FaBed, FaChair, FaMapMarkerAlt, FaParking, FaShare } from "react-icons/fa";
import Contact from '../components/Contact';


export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [copied, setCopied] = useState(false)
    const params = useParams()
    const [contact, setContact] = useState(false)
    const {currentUser} = useSelector(state => state.user)
    useEffect(() => {
        try {
            setLoading(true)
            setError(false)
            const fetchListing = async () => {
              const listingId = params.listingId;
              const res = await fetch(`/api/listing/get/${listingId}`)
              const data = await res.json();
              if(data.success === false){
                console.log("Error Occurred: " , data.message)
                setLoading(false)
                setError(true)
                return 
              }
              setListing(data)
              setLoading(false)
            }
            fetchListing()
        } catch (error) {
            setError(true)
        }
      }, [params.listingId])
      
  return (
    <main>
        {loading && <h1 className='text-center mt-20 font-semibold text-2xl'>Loading...</h1>}
        {error && <h1 className='text-center mt-20 font-semibold text-2xl'>Something went wrong :(</h1>}
        {listing && !loading && !error && 
        (
            <>
            <Swiper navigation>
                {listing.imageUrls.map((image) => (
                    <SwiperSlide key={image}>
                        <div className="h-[450px] w-full flex items-center justify-center" style={{background: `url(${image}) center no-repeat`, backgroundSize: 'cover'}}>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
            <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
            <div className="p-3 my-7 mx-auto flex flex-col max-w-4xl gap-4">
                <h1 className='text-2xl font-semibold'>{listing.name} - PKR{' '} 
                    {listing.offer ?
                    (listing.discountedPrice ?? 0).toLocaleString("en-US") :
                    (listing.regularPrice ?? 0).toLocaleString("en-US")
                    }
                    {listing.type === 'rent' && ' / Month'}
                </h1>
                <p className='flex text-sm items-center gap-2 text-green-700'>
                    <FaMapMarkerAlt /> <span className='text-slate-700'>{listing.address}</span>
                </p>
                <div className="flex gap-2">
                    <p className='p-1 text-lg text-center rounded-lg w-full max-w-[200px] bg-red-900 text-white'>
                        {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
                    </p>
                    {listing.offer && (
                        <p className='p-1 text-lg text-center rounded-lg w-full max-w-[200px] bg-green-900 text-white' >
                            PKR {((listing.regularPrice ?? 0) - (listing.discountedPrice ?? 0)).toLocaleString('en-US')} Discount
                            </p>
                    ) }
                </div>
                <p className='text-slate-800'>
                    <span className='font-semibold text-black'>Description - {' '} </span>
                    {listing.description}
                </p>
                <ul className='flex flex-wrap items-center gap-4 sm:gap-6 text-green-900 font-semibold text-sm'>
                    <li className='flex items-center gap-1 text-md whitespace-nowrap'>
                        <FaBed className='text-lg'/>
                        {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : 
                        `${listing.bedrooms} bed`}
                    </li>
                    <li className='flex items-center gap-1 text-md whitespace-nowrap'>
                        <FaBath className='text-sm'/>
                        {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : 
                        `${listing.bathrooms} bath`}
                    </li>
                    <li className='flex items-center gap-1 text-md whitespace-nowrap'>
                        <FaParking className='text-lg'/>
                        {listing.parking ? "Parking Available" : "No Parking"}
                    </li>
                    <li className='flex items-center gap-1 text-md whitespace-nowrap'>
                        <FaChair className='text-lg'/>
                        {listing.furnished ? "Furnished" : "Unfurnished"}
                    </li>
                </ul>
                {currentUser && currentUser._id != listing.userRef && !contact &&
                <button onClick={()=> setContact(true)} className='my-5 bg-slate-700 text-white p-3 rounded-lg hover:opacity-85 cursor-pointer w-80 sm:w-full self-center'>Contact Landlord</button>
                }
                {contact && <Contact listing={listing} />}
            </div>
            </>
        )
        }
    </main>
  )
}
