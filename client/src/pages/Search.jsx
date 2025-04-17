import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 border-gray-300 md:border-r-2 md: md:border-b-0 md:min-h-screen">
        <form className='flex flex-col gap-7'>
            <div className="flex items-center gap-3">
                <label className='font-semibold whitespace-nowrap'>Search Term:</label>
                <input
                className='border rounded-lg border-gray-300 bg-amber-50 p-2 w-full'
                type="text"
                placeholder='Search...'
                id='searchTerm'
                />
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <label className='font-semibold'>Type:</label>
                <div className="flex gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="all"
                    />
                    <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="rent"
                    />
                    <span>Rent</span>
                </div>
                <div className="flex  gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="sale"
                    />
                    <span>Sale</span>
                </div>
                <div className="flex  gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="offer"
                    />
                    <span>Offer</span>
                </div>   
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <label className='font-semibold'>Amenities:</label>
                <div className="flex gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="parking"
                    />
                    <span>Parking</span>
                </div>
                <div className="flex gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="furnished"
                    />
                    <span>Furnished</span>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <label className='font-semibold'>Sort:</label>
                <select className='border rounded-lg bg-amber-50 text-sm p-1 border-gray-300' id="sort_order">
                    <option value="">Price high to low</option>
                    <option value="">Price low to high</option>
                    <option value="">Latest</option>
                    <option value="">Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white uppercase cursor-pointer hover:opacity-95 p-3 rounded-lg'>Search</button>
        </form>
      </div>
      <div className="">
        <h1 className='text-3xl font-semibold text-center p-3 mt-5 text-slate-700'>Listing Results:</h1>
      </div>
    </div>
  )
}
