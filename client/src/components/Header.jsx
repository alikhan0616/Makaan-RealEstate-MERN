import { FaSearch } from "react-icons/fa"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
export default function Header() {
  const {currentUser} = useSelector(state => state.user)
  return (
    <header className='bg-slate-200  shadow-md'>
      <div className='flex justify-between items-center max-w-6xl p-3 mx-auto'>
        <Link to='/'>
      <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
        <span className='text-slate-500'>Makaan</span>
        <span className='text-slate-700'>Estate</span>
      </h1>
        </Link>
      <form className='bg-slate-100 rounded-lg p-3 flex items-center' >
        <input type="text" placeholder='Search...' className="focus:outline-none w-26 sm:w-64"/>
        <FaSearch className="text-slate-600"/>
      </form>
      <ul className="flex gap-4 text-slate-700">
        <Link to='/'>
        <li className='hidden sm:inline hover:underline'>Home</li>
        </Link>
        <Link to='/about'>
        <li className='hidden sm:inline hover:underline'>About</li>
        </Link>
        <Link to = '/profile'>
        {currentUser ? (
            <img className="h-7 w-7 rounded-full object-cover items-center text-center" src={currentUser.avatar} alt="profile icon" />
          ) : (
          <li className="hover:underline">Sign In</li>
          )
        }
        </Link>
      </ul>
      </div>
    </header>
  )
}
