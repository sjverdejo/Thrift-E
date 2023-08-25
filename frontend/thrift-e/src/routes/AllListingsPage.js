import { useOutletContext } from "react-router-dom"
import Items from '../components/items/Items'

const AllListingsPage = () => {
  const { user, allItems } = useOutletContext()
  
  return (
    <div>
      <h1>All Items</h1>
        <Items items={allItems.filter((i) => ((i.seller.toString() !== user.user._id) && (!i.isSold)))} />
    </div>
  )
}

export default AllListingsPage