import { useOutletContext } from "react-router-dom"
import Items from '../components/items/Items'

const AllListingsPage = () => {
  const { user, allItems } = useOutletContext()
  const items = allItems.filter(i => !i.isSold)
  
  return (
    <div class='grid grid-cols-4 place-items-center gap-1 m-2'>
        <Items items={items.filter(i => i.seller.toString() !== user.user._id)} />
    </div>
  )
}

export default AllListingsPage