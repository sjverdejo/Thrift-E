import { Link, useOutletContext, useNavigate, useParams } from 'react-router-dom'
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

  const transactionList = () => {
    if (showSold) {
      return (
        <h1>Hi</h1>
      )
    } else {

    }
  }
  const profilePage = () => {
    const transactions = profile.transactions
    return (
      <div>
          <h1>{profile.username}</h1>
          {/* Change to image if available */}
          <img src={Void} alt={'No img'} width={100}/>
          <h2>{profile.dateCreated}</h2>
          
          <div id='forItems'>
            <button onClick={()=> {setShowItems(!showItems); setShowHistory(false)}}>Show Items</button>
            {(showItems && profile.items) &&
              <div>
                <h3>Items</h3>
                <Items items={profile.items.filter(i => !i.isSold)}/>
              </div>
            }
          </div>
          {user.user._id === profile._id &&
            <div id='forTransactions'>
            <button onClick={()=> {setShowHistory(!showHistory); setShowItems(false)}}>Show Transactions</button>
              {(showHistory && transactions) &&
                (
                <div>
                  <h3>Transactions</h3>
                  <button onClick={() => {setShowSold(!showSold)}}>
                    {!showSold ? 'Show Items You Sold' : 'Show Items You Bought'}
                  </button>
                    {
                      showSold
                        ? <Transactions list={profile.transactions.filter(t => t.item.seller.toString() === profile._id)} />
                        : <Transactions list={profile.transactions.filter(t => t.item.seller.toString() !== profile._id)} />
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