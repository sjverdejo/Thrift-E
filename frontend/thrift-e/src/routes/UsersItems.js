import { useOutletContext } from 'react-router-dom'
import { useState } from 'react'
import Items from '../components/items/Items'
const UsersItems = () => {
  const { user, allItems } = useOutletContext()
  const allMyItems = allItems.filter(i => (i.seller.toString() === user.user._id))
  const [myItems, setMyItems] = useState(allMyItems)
  const [showAll, setShowAll] = useState(false)

  const showItems = () => {
    setShowAll(!showAll)

    showAll 
      ? setMyItems(allMyItems.filter(i => !i.isSold)) 
      : setMyItems(allMyItems.filter(i => i.isSold))
  }

  return (
    <div>
      <button onClick={showItems}>{showAll ? 'Show Sold Items' : 'Show All Items'}</button>
      <Items items={myItems} />
    </div>
  )
}

export default UsersItems