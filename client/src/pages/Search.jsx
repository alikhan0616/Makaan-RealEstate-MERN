import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListingItem from '../components/ListingItem'

export default function Search() {
    const [sidebarData, setSidebarData] = useState({
        searchTerm: '',
        type: 'all',
        parking: false,
        furnished: false,
        offer: false,
        sort: 'created_at',
        order: 'desc'
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)
    const [listings, setListings] = useState([])
    const [showMore, setShowMore] = useState(false)

    console.log(listings)
    const navigate = useNavigate()
    useEffect(() => {
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm') 
        const typeFromUrl = urlParams.get('type') 
        const parkingFromUrl = urlParams.get('parking') 
        const furnishedFromUrl = urlParams.get('furnished') 
        const offerFromUrl = urlParams.get('offer') 
        const sortFromUrl = urlParams.get('sort')  
        const orderFromUrl = urlParams.get('order') 

        if(
            searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl
        ){
            setSidebarData({
                searchTerm: searchTermFromUrl || '',
                type: typeFromUrl || 'all',
                parking: parkingFromUrl === 'true' ? true : false,
                furnished: furnishedFromUrl === 'true' ? true : false,
                offer: offerFromUrl === 'true' ? true : false,
                sort: sortFromUrl || 'created_at',
                order: orderFromUrl || 'desc',
            })
        }

        const fetchListings = async () => {
            try {
                setLoading(true)
                setError(false)
                const searchQuery = urlParams;
                const res = await fetch(`/api/listing/get?${searchQuery}`)
                const data = await res.json();
                if(data.success === 'false'){
                    setError(true)
                    setLoading(false)
                    console.log("error occured:", data.message)
                    return;
                }
                if(data.length > 8){
                    setShowMore(true);
                } else {
                    setShowMore(false)
                }
                setListings(data);
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(true)
                console.log("error occured:", error)
            }
    }
    fetchListings()
    }, [location.search])
    const handleChange = (e) => {
        
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSidebarData({...sidebarData, type: e.target.id})
        }
        if(e.target.id === 'searchTerm'){
            setSidebarData({...sidebarData, searchTerm: e.target.value})
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSidebarData({...sidebarData, [e.target.id]: e.target.checked || e.target.checked === 'true' ? true : false})
        }
        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at'
            const order = e.target.value.split('_')[1] || 'desc'

            setSidebarData({...sidebarData, sort, order})
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm', sidebarData.searchTerm)
        urlParams.set('type', sidebarData.type)
        urlParams.set('parking', sidebarData.parking)
        urlParams.set('furnished', sidebarData.furnished)
        urlParams.set('offer', sidebarData.offer)
        urlParams.set('sort', sidebarData.sort)
        urlParams.set('order', sidebarData.order)
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`)
    }
    const handleShowMore = async () => {
        const numberOfListings = listings.length
        const startIndex = numberOfListings;
        const urlParams = new URLSearchParams(location.search)
        urlParams.set('startIndex', startIndex)
        const searchQuery = urlParams.toString()
        const res = await fetch(`/api/listing/get?${searchQuery}`)
        const data = await res.json()
        if(data.length < 9){
            setShowMore(false)
        } else {
            setShowMore(true)
        }
        setListings([...listings, ...data])
    }
  return (
    <div className='flex flex-col md:flex-row'>
      <div className="p-7 border-b-2 border-gray-300 md:border-r-2 md: md:border-b-0 md:min-h-screen">
        <form onSubmit={handleSubmit} className='flex flex-col gap-7'>
            <div className="flex items-center gap-3">
                <label className='font-semibold whitespace-nowrap'>Search Term:</label>
                <input
                className='border rounded-lg border-gray-300 bg-amber-50 p-2 w-full'
                type="text"
                placeholder='Search...'
                id='searchTerm'
                value={sidebarData.searchTerm}
                onChange={handleChange}
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
                    onChange={handleChange}
                    checked={sidebarData.type === 'all'}
                    />
                    <span>Rent & Sale</span>
                </div>
                <div className="flex gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="rent"
                    onChange={handleChange}
                    checked={sidebarData.type === 'rent'}
                    />
                    <span>Rent</span>
                </div>
                <div className="flex  gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="sale"
                    onChange={handleChange}
                    checked={sidebarData.type === 'sale'}
                    />
                    <span>Sale</span>
                </div>
                <div className="flex  gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="offer"
                    onChange={handleChange}
                    checked={sidebarData.offer}
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
                    onChange={handleChange}
                    checked={sidebarData.parking}
                    />
                    <span>Parking</span>
                </div>
                <div className="flex gap-2">
                    <input
                    className='w-5'
                    type="checkbox"
                    name="type"
                    id="furnished"
                    onChange={handleChange}
                    checked={sidebarData.furnished}
                    />
                    <span>Furnished</span>
                </div>
            </div>
            <div className="flex flex-1 items-center gap-3">
                <label className='font-semibold'>Sort:</label>
                <select
                onChange={handleChange}
                defaultValue={'created_at_desc'}
                className='border rounded-lg bg-amber-50 text-sm p-1 border-gray-300'
                id="sort_order"
                >
                    <option value='regularPrice_desc'>Price high to low</option>
                    <option value='regularPrice_asc'>Price low to high</option>
                    <option value="createdAt_desc">Latest</option>
                    <option value="createdAt_asc">Oldest</option>
                </select>
            </div>
            <button className='bg-slate-700 text-white uppercase cursor-pointer hover:opacity-95 p-3 rounded-lg'>Search</button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className='text-3xl font-semibold border-gray-200 border-b-2 p-3 mt-5 text-slate-700'>Listing Results:</h1>
        <div className="flex flex-wrap gap-4 p-7">
        {loading && <h1 className='font-semibold text-xl text-slate-700 text-center p-3 w-full'>Loading...</h1>}
        {error && <h1 className='text-red-700 text-center font-semibold p-3'>Error Occurred Fetching Listings...</h1>}
        {!loading && listings.length === 0 && (
            <p className='text-slate-700 font-semibold text-center text-xl'>No Listing Found!</p>
        )}
        {!loading && listings && listings.map((listing) => <ListingItem key={listing._id} listing={listing} />)}
        </div>
        {showMore && (
        <button onClick={handleShowMore} className='text-center w-full my-4 text-green-700 hover:underline'>Show More</button>
        )}
      </div>
    </div>
  )
}
