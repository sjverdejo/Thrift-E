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
      <div class='flex flex-col justify-center items-center mt-5 p-2'>
          <h1 class='text-6xl'>{profile.username}</h1>
          <div>
            {profile.profilePicture ? <img class='max-h-96 mt-2 max-w-xl' src={process.env.REACT_APP_S3 + profile.profilePicture} alt='profile pic' /> : <img class='max-h-96 mt-2 max-w-xl' src={Void} alt='No img' />}
          </div>
          {user.user._id === profile._id && 
            <div class='text-center'>
              <button class='text-slate-400' onClick={() => setShowUpdate(!showUpdate)}>Update Profile Picture</button>
              {showUpdate && <UpdateUserForm profile={profile} setAlertMessage={setAlertMessage} setShowUpdate={setShowUpdate}/>}
            </div>
          }
          <h2>Account Created:  {helper.convertDate(profile.dateCreated)}</h2>
          <div class='flex space-x-80'>
            <button class='text-slate-400' onClick={()=> {setShowItems(!showItems); setShowHistory(false); setShowUpdate(false)}}>Show Items</button>
            {user.user._id === profile._id && <button class='text-slate-400' onClick={()=> {setShowHistory(!showHistory); setShowItems(false); setShowUpdate(false)}}>Show Transactions</button>}
          </div>
          <div>
            {(showItems && profile.items) &&
              <div class='w-80'>
                <h3 class='text-3xl text-center'>Items</h3>
                <Items items={profile.items.filter(i => !i.isSold)}/>
              </div>
            }
          </div>
          {user.user._id === profile._id &&
            <div class='text-center'>
              {(showHistory && transactions) &&
                (
                <div>
                  <h3>Transactions</h3>
                  <button class='text-slate-200 bg-slate-600 rounded-md shadow-xl p-2' onClick={() => {setShowSold(!showSold)}}>
                    {!showSold ? 'Show Items You Sold' : 'Show Items You Bought'}
                  </button>
                    {
                      showSold
                        ? <div>
                            <h1 class='text-2xl mt-6'>Items Sold</h1>
                            <Transactions list={profile.transactions.filter(t => t.item.seller.toString() === profile._id)} isSeller={true} />
                          </div>
                        : <div>
                            <h1 class='text-2xl mt-6'>Items Bought</h1>
                            <Transactions list={profile.transactions.filter(t => t.item.seller.toString() !== profile._id)} isSeller={false}/>
                          </div>
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