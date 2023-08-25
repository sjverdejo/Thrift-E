import { useParams, useOutletContext, Link } from 'react-router-dom'
import { useState } from 'react'
import Item from '../components/items/Item'

const ListingPage = () => {
  const { id } = useParams()
  const { user, allItems } = useOutletContext()
  const item = allItems.find(i => i._id === id)
  const isBuyer = item.seller.toString() === user.user._id
  
  return (
    <div>
      <Item item={item}/>
      <Link to={`/user/${item.seller}`}>Seller</Link>
      <br/>
      {isBuyer && <button>Buy</button>}
    </div>
    
  )
}

export default ListingPage