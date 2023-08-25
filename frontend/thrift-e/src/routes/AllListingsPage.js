import { useOutletContext } from "react-router-dom"
import { useState } from 'react'
import Items from '../components/items/Items'

const AllListingsPage = () => {
  const { user, allItems } = useOutletContext()
  const [itemList, setItemList] = useState(allItems.filter((i) => (i.seller.toString() !== user.user._id)))
  
  return (
    <div>
      <h1>Items</h1>
        <Items items={itemList} />
    </div>
  )
}

export default AllListingsPage