import { useOutletContext, useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import usersAPI from '../services/users'
import Void from '../assets/void.png'
import Items from '../components/items/Items'
import Transactions from '../components/checkout/Transactions'

const UserPage = () => {
  const { user } = useOutletContext()
  const navigate = useNavigate()
  const { id } = useParams()
  const [profile, setProfile] = useState(null)
  const [showHistory, setShowHistory] = useState(false)
  const [showItems, setShowItems] = useState(false)
  const [showSold, setShowSold] = useState(false)
  
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
    const transactions = profile.transactions
    return (
      <div>
          <h1>{profile.username}</h1>
          {profile.profilePicture ? <img src={process.env.REACT_APP_S3 + profile.profilePicture} alt='profile pic' width={100} /> : <img src={Void} alt='No img' width={100}/>}
          <h2>{profile.dateCreated}</h2>
          <button onClick={()=> {setShowItems(!showItems); setShowHistory(false)}}>Show Items</button>
          <button onClick={()=> {setShowHistory(!showHistory); setShowItems(false)}}>Show Transactions</button>
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