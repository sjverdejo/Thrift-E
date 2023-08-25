import { Link, useOutletContext, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import usersAPI from '../services/users'
import Void from '../assets/void.png'
import Items from '../components/items/Items'

const UserPage = () => {
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [showItems, setShowItems] = useState(false)
  
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
          
          <div id='forItems'>
            <button onClick={()=> {setShowItems(!showItems); setShowHistory(false)}}>Show Items</button>
            {(showItems && profile.items) &&
              <Items items={profile.items}/>
            }
          </div>
          <div id='forTransactions'>
          <button onClick={()=> {setShowHistory(true); setShowItems(false)}}>Show Transactions</button>
            {/*showHistory for transactions*/}
          </div>
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