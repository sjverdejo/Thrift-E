import { useOutletContext, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import usersAPI from '../services/users'
import Void from '../assets/void.png'
import Items from '../components/items/Items'
import Transactions from '../components/checkout/Transactions'
import UpdateUserForm from '../components/user/UpdateUserForm'
import helper from '../helper'

const UserPage = () => {
  const { user, setAlertMessage } = useOutletContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [showItems, setShowItems] = useState(false)
  const [showSold, setShowSold] = useState(false)
  const [showUpdate, setShowUpdate] = useState(false)

  useEffect(()=> {
    usersAPI.getUser(id)
      .then(res => {
        setProfile(res)
      })
      .catch (err => {
        setAlertMessage('Could not find user.')
        navigate('/')
      })

  }, [user, id])

  const profilePage = () => {
    const transactions = profile.transactions
    return (
      <div>
          <h1>{profile.username}</h1>
          {profile.profilePicture ? <img src={process.env.REACT_APP_S3 + profile.profilePicture} alt='profile pic' width={100} /> : <img src={Void} alt='No img' width={100}/>}
          {user.user._id === profile._id && 
            <div>
              <button onClick={() => setShowUpdate(!showUpdate)}>Update Profile Picture</button>
              {showUpdate && <UpdateUserForm profile={profile} setAlertMessage={setAlertMessage} setShowUpdate={setShowUpdate}/>}
            </div>
          }
          <h2>Account Created:  {helper.convertDate(profile.dateCreated)}</h2>
          <button onClick={()=> {setShowItems(!showItems); setShowHistory(false); setShowUpdate(false)}}>Show Items</button>
          {user.user._id === profile._id && <button onClick={()=> {setShowHistory(!showHistory); setShowItems(false); setShowUpdate(false)}}>Show Transactions</button>}
          <div id='forItems'>
            {(showItems && profile.items) &&
              <div>
                <h3>Items</h3>
                <Items items={profile.items.filter(i => !i.isSold)}/>
              </div>
            }
          </div>
          {user.user._id === profile._id &&
            <div id='forTransactions'>
              {(showHistory && transactions) &&
                (
                <div>
                  <h3>Transactions</h3>
                  <button onClick={() => {setShowSold(!showSold)}}>
                    {!showSold ? 'Show Items You Sold' : 'Show Items You Bought'}
                  </button>
                    {
                      showSold
                        ? <Transactions list={profile.transactions.filter(t => t.item.seller.toString() === profile._id)} isSeller={true} />
                        : <Transactions list={profile.transactions.filter(t => t.item.seller.toString() !== profile._id)} isSeller={false}/>
                    }
                </div>
                )
              }
            </div>
          }
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