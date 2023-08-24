import { useOutletContext } from "react-router-dom"
import { useState, useEffect } from 'react'
import Items from '../components/items/Items'

const ItemsPage = () => {
  const { user, allItems, id } = useOutletContext()
  const [itemList, setItemList] = useState([])
  const [isMine, setIsMine] = useState(false)
  const [showMySold, setShowMySold] = useState(false)
  const myInventory = allItems.filter((i) => (i.seller.toString() === id))
  useEffect(() => {
    if (id === user.user._id) {
        // setItemList(allItems.filter((i) => (i.seller.toString() === id) && (!i.isSold)))
        showMySold 
      ? setItemList(myInventory.filter((i) => (i.isSold)))
      : setItemList(myInventory.filter((i) => (!i.isSold)))
        setIsMine(true)
    } else {
        setItemList(allItems.filter((i) => i.seller.toString() !== user.user._id))
    }
  }, [showMySold])
  
  return (
    <div>
      <h1>Items</h1>
      {isMine && 
        <button onClick={() => setShowMySold(!showMySold)}>
          {
            showMySold 
              ? 'Show Items for Sale'
              : 'Show Items Sold'
          }
        </button>}
      <Items items={itemList} />
    </div>
  )
}

export default ItemsPage