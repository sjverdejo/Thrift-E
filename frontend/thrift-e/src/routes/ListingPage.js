import { useParams, useOutletContext, Link, Outlet, useNavigate } from 'react-router-dom'
import Item from '../components/items/Item'

const ListingPage = () => {
  const { id } = useParams()
  const { user, allItems, setAlertMessage } = useOutletContext()
  const item = allItems.find(i => i._id === id)
  
  const navigate = useNavigate()
  if (item) {
    const isBuyer = item.seller.toString() !== user.user._id && !item.isSold

    return (
      <div>
        <Item item={item}/>
        <h3>Type: {item.clothingType}</h3>
        <Link to={`/user/${item.seller}`}>Seller</Link>
        <br/>
        {isBuyer && 
        ( 
          <div>
          <Link to='./checkout'>
            <button>Buy</button>
          </Link>
          <Outlet context={{item, user, setAlertMessage}}/>
          </div>
        )}
      </div>
    )
  } else {
    console.log('No item')
    navigate('/')
  }
}

export default ListingPage