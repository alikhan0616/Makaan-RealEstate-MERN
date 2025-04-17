import React from 'react'
import { MdLocationOn } from 'react-icons/md'
import { Link } from 'react-router-dom'

export default function ListingItem({listing}) {
  return (
    <div className='shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full md:w-[330px] bg-white rounded-lg'>
      <Link to={`/listing/${listing._id}`}>
      <img src={listing.imageUrls[0]} alt="listing image"
      className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'
      />
      <div className='flex flex-col gap-1 p-3 w-full'>
        <p className=' truncate text-lg font-semibold text-slate-700'>{listing.name}</p>
        <div className="flex items-center h-10">
        <MdLocationOn className='h-4 w-4 text-green-700' />
        <p className='text-sm text-gray-600 line-clamp-1 w-full text-start'>{listing.address}</p>
        </div>
        <p className='text-sm line-clamp-2 text-gray-600 h-[40px]'>{listing.description}</p>
        <p className='text-slate-500 font-semibold mt-2' >
            PKR {listing.offer ? listing.discountedPrice.toLocaleString('em-US') : listing.regularPrice.toLocaleString('em-US')}
            {" "}
            {listing.type === 'rent' && "/ Month"}
        </p>
        <div className="text-slate-700 flex gap-3">
            <div className="text-xs font-bold">
                {listing.bedrooms > 1 ? `${listing.bedrooms} beds` : `${listing.bedrooms} bed`}
            </div>
            <div className="text-xs font-bold">
                {listing.bathrooms > 1 ? `${listing.bathrooms} baths` : `${listing.bathrooms} bath`}
            </div>
        </div>
      </div>
      </Link>
    </div>
  )
}
