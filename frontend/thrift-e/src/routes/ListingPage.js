import { useState, useEffect } from 'react'
import { useParams, useOutletContext, Link, Outlet } from 'react-router-dom'
import Item from '../components/items/Item'
import UpdateListingForm from '../components/items/UpdateListingForm'
import EditImages from '../components/items/EditImages'
import Void from '../assets/void.png'
import helper from '../helper'

const ListingPage = () => {
  const { id } = useParams()
  const { user, allItems, setAlertMessage } = useOutletContext()
  const item = allItems.find(i => i._id === id)
  const imgLink = process.env.REACT_APP_S3
  const [mainImg, setMainImg] = useState('')
  const [updateForm, setUpdateForm] = useState(false)
  const [editImgs, setEditImgs] = useState(false)

  useEffect(() => {
    if (item && item.itemImages) {
      setMainImg(`${imgLink}${item.itemImages[0]}`)
    }
  }, [])

  const imgView = () => {
    return (
    <div>
      <img src={mainImg} width={100} alt='main'/>
      <div>
        {item.itemImages.map(i => 
          <img key={i} src={imgLink + i} width={50} onClick={() => setMainImg(`${imgLink}${i}`)} alt='item'/>)}
      </div>
    </div>
    )
  }

  if (item) {
    const isBuyer = item.seller.toString() !== user.user._id && !item.isSold


    return (
      <div>
        <Link to='/listings'>Back to listings</Link>
        {
          item.itemImages.length === 0
            ? <img src={Void} width={50} alt='none provided'/>
            : imgView()
        }
        {!isBuyer && (
          <div>
            <button onClick={()=>setEditImgs(!editImgs)}>Edit Images</button>
            {editImgs && <EditImages item={item} setAlertMessage={setAlertMessage}/>}
          </div>
        )}
        <Item item={item}/>
        <h3>Type: {item.clothingType}</h3>
        <h4>Date Posted {helper.convertDate(item.datePosted)}</h4>
        <Link to={`/user/${item.seller}`}>Seller</Link>
        <br/>
        {isBuyer && 
        ( 
          <div>
            <Link to='./checkout'>
              <button>Buy Item</button>
            </Link>
            <Outlet context={{item, user, setAlertMessage}}/>
          </div>
        )}
        {!isBuyer && (
          <div>
            <button onClick={()=>setUpdateForm(!updateForm)}>Update Listing Info</button>
            {updateForm && <UpdateListingForm item={item} setAlertMessage={setAlertMessage}/>}
          </div>
        // )}
        )}
      </div>
    )
  }
}

export default ListingPage