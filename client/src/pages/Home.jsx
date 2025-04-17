import { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import ListingItem from '../components/ListingItem'
import {Swiper, SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import SwiperCore from 'swiper'

export default function Home() {
  const [offerListings, setOfferListings] = useState([])
  const [saleListings, setSaleListings] = useState([])
  const [rentListings, setRentListings] = useState([])
  SwiperCore.use([Navigation])
  console.log(offerListings)
  useEffect(() => {
    
      const fetchOfferListings = async ()=> {
        try {
          const res = await fetch(`/api/listing/get?offer=true&limit=4`)
          const data = await res.json();
          setOfferListings(data)
          fetchRentListings();
          
        } catch (error) {
          console.log(error)
        }
      }
      
    const fetchRentListings = async() => {
      try {
        const res = await fetch(`/api/listing/get?type=rent&limit=4`)
        const data = await res.json();
        setRentListings(data);
        fetchSaleListings()
      } catch (error) {
        console.log(error)
      }
    }
    const fetchSaleListings = async() => {
      try {
        const res = await fetch(`/api/listing/get?type=sale&limit=4`)
        const data = await res.json()
        setSaleListings(data);
      } catch (error) {
        console.log(error)
      }
    }
    Promise.all([fetchOfferListings(), fetchRentListings(), fetchSaleListings()])
  }, [])
  return (
    <div>
      <div className="flex flex-col gap-6 py-26 px-3 max-w-6xl mx-auto">
        <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span><br/> place with ease</h1>
        <div className="text-gray-500 text-xs sm:text-sm">
          Makaan State will help you find your home fast, early and comfortable. Our expert support are always available
         <br />
         We have a wide range of properties for you to choose from.
        </div>
        <Link className='text-xs sm:text-sm font-bold text-blue-800 hover:underline' to='/search'>
        Lets get started...
        </Link>
      </div>

      <Swiper navigation>
      {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
        <SwiperSlide>
          <div className='h-[500px]' style={{background: `url(${listing.imageUrls[0]}) center no-repeat`, backgroundSize:'cover'}} key={listing._id}></div>
        </SwiperSlide>
      ))}
      </Swiper>

      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
        {
          offerListings && offerListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl text-slate-600 font-semibold'>Recent Offers</h2>
                <Link className='text-sm text-blue-800 hover:underline' to='/search?offer=true'>
                Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  offerListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          rentListings && rentListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl text-slate-600 font-semibold'>Recent place for rent</h2>
                <Link className='text-sm text-blue-800 hover:underline' to='/search?type=rent'>
                Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  rentListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
        {
          saleListings && saleListings.length > 0 && (
            <div className="">
              <div className="my-3">
                <h2 className='text-2xl text-slate-600 font-semibold'>Recent places for sale</h2>
                <Link className='text-sm text-blue-800 hover:underline' to='/search?type=sale'>
                Show more offers
                </Link>
              </div>
              <div className="flex flex-wrap gap-4">
                {
                  saleListings.map((listing) => (
                    <ListingItem key={listing._id} listing={listing} />
                  ))
                }
              </div>
            </div>
          )
        }
      </div>

    </div>
  )
}
