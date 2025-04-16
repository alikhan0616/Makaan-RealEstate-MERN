import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function Contact({listing}) {
    const [landlord, setLandlord] = useState(null)
    const [message, setMessage] = useState(null)

    useEffect(() => {
        const fetchLandlord = async () => {
            try {
                const res = await fetch(`/api/user/${listing.userRef}`)
                const data = await res.json();
                if(data.success === false){
                    console.log(data.message)
                    return
                }
                setLandlord(data)
            } catch (error) {
                console.log("Error occurred: ", error)
            }
        }
        fetchLandlord()
    }, [listing.userRef])
    const handleMessage = (e) => {
        setMessage(e.target.value)
    }
  return (
    <>
    {landlord && (
        <div className="flex flex-col gap-2">
            <p>
                Contact <span className='font-semibold'>{landlord.username}</span> for 
                {" "}<span className='font-semibold'>{listing.name.toLowerCase()}</span>
            </p>
            <textarea
            name="message"
            id="message"
            rows='2'
            value={message ? message : ""}
            onChange={handleMessage}
            placeholder='Enter your message...'
            className='w-full p-3 rounded-lg border border-gray-500'
            required
            >
            </textarea>
            <a 
  className='p-3 hover:opacity-90 bg-slate-700 self-start text-white rounded-lg' 
  href={`https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(landlord.email)}&su=${encodeURIComponent(`Regarding ${listing.name}`)}&body=${encodeURIComponent(message)}`}
  target="_blank"
>
  Send Message
</a>
        </div>
    )}
    </>
  )
}
