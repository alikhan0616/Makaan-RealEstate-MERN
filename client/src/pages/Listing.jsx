import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation } from 'swiper/modules'
import 'swiper/css/bundle'

export default function Listing() {
    SwiperCore.use([Navigation])
    const [listing, setListing] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const params = useParams()
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
            </>
        )
        }
    </main>
  )
}
