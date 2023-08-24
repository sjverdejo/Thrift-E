import { Link, useOutletContext, useNavigate, useParams, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import usersAPI from '../services/users'
import Void from '../assets/void.png'

const UserPage = () => {
  const {user, allItems} = useOutletContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(()=> {
    usersAPI.getUser(id)
      .then(res => {
        console.log('res', res)
        setProfile(res)
      })
      .catch (err => {
        console.log('Error here')
        navigate('/')
      })

  }, [user, id])

  const profilePage = () => {
    return (
      <div>
          <h1>{profile.username}</h1>
          {/* Change to image if available */}
          <img src={Void} alt={'No img'} width={100}/>
          <h2>{profile.dateCreated}</h2>
          <Link to='./items'><button>Items</button></Link>
          
          <button>Transactions</button>
          <Outlet context={{user, allItems, id}}/>
      </div>
    )
  }
  return (
    <div>
      {profile && profilePage()}
    </div>
  )
}

export default UserPage