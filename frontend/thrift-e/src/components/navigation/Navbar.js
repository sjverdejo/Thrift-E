import { Link } from 'react-router-dom'
const Navbar = ({user}) => {
  if (user) {
    return (
      <div>
        <ul>
          <li><Link to='/'>Home</Link></li>
          <li><Link to='/listings'>All Listings</Link></li>
          <li><Link to={`user/${user.user._id}`}>My Profile</Link></li>
          <li><Link to='/create'>Sell</Link></li>
        </ul>
    </div>
    )
  } else {
    return (
      <div>
        <ul>
          <li><Link to='/login'>Sign In/Register</Link></li>
        </ul>
      </div>
    )
  }
  
}

export default Navbar