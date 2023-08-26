import { useOutletContext } from "react-router-dom"
import Items from '../components/items/Items'

const AllListingsPage = () => {
  const { user, allItems } = useOutletContext()
  const items = allItems.filter(i => !i.isSold)
  
  return (
    <div>
      <h1>All Items</h1>
        <Items items={items.filter(i => i.seller.toString() !== user.user._id)} />
    </div>
  )
}

export default AllListingsPage