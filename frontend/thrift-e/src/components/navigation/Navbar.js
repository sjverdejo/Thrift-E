import { Link } from 'react-router-dom'

const Navbar = ({user}) => {
  const loggedIn = () => {
    return (
      <div class='flex space-x-4 items-center text-sm'>
        <div><Link to='/listings'>All Listings</Link></div>
        <div><Link to={`user/${user.user._id}`}>My Profile</Link></div>
        <button class='bg-red-600 w-40 p-1 rounded-lg shadow-xl hover:bg-red-400 active:bg-red-800 p-2 text-white'><Link to='/create'>Create Listing</Link></button>
      </div>
    )
  }
  
  return (
    <div class='rounded-b-md bg-neutral-300 shadow-md opacity-100 sticky w-full z-20 h-20 top-0 left-0 border-gray-200 flex justify-between p-6 font-medium'>
      <div class='flex w-full justify-between items-center'>
        <div class='text-xl'>{user ? <Link to='/'>Thrift-e</Link> : 'Thrift-E' }</div>
        {user && loggedIn()}
      </div>
      
    </div>
  )
  
}

export default Navbar