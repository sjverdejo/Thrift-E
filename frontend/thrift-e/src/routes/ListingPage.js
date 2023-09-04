import { useState, useEffect } from 'react'
import { useParams, useOutletContext, Link, Outlet } from 'react-router-dom'
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
    } else {
      setMainImg(Void)
    }
  }, [])

  const imgView = () => {
    return (
    <div class='flex flex-col items-center'>
      <div class='h-96 w-11/12 flex justify-center'>
        <img class='h-96 w-94' src={mainImg} alt='main'/>
      </div>
      <div class='flex flex-row h-16 w-16'>
        {item.itemImages.map(i => 
          <img key={i} src={imgLink + i} onClick={() => setMainImg(`${imgLink}${i}`)} alt='item'/>)}
      </div>
    </div>
    )
  }

  if (item) {
    const isBuyer = item.seller.toString() !== user.user._id && !item.isSold


    return (
      <div class='text-slate-200'>
        <Link class='text-slate-600' to='/listings'>Back to listings</Link>
        {
          item.itemImages.length === 0
            ? <div class='flex justify-center'><div class='h-5/6 w-11/12 flex justify-center'><img class='h-96 w-94' src={Void} alt='none provided'/></div></div>
            : imgView()
        }
        <div>
        {!isBuyer && (
            <div class='flex flex-col items-center justify-center text-slate-600'>
              <button onClick={()=>setEditImgs(!editImgs)}>Edit Images</button>
              {editImgs && <EditImages item={item} setAlertMessage={setAlertMessage}/>}
            </div>
          )}
        <div class='flex justify-center items-center'>
          <div class='flex flex-col w-3/5 h-full p-5 m-5 bg-slate-600 rounded-xl shadow-xl'>
            <div class='flex justify-between'>
              <h1 class='text-3xl'>{item.name}</h1>
              <h1 class='text-3xl'>${item.price}</h1>
            </div>
            <h3>Type: {item.clothingType}</h3>
            <div class='flex justify-between'>
              <h4>Posted: {helper.convertDate(item.datePosted)}</h4>
              <Link class='text-slate-400' to={`/user/${item.seller}`}>Seller Profile</Link>
            </div>
            {isBuyer && 
            ( 
              <div class='mt-3'>
                <Link to='./checkout'>
                  <button class='bg-slate-200 hover:bg-slate-600 active:bg-slate-200 p-3 rounded-lg shadow-xl text-slate-800 mb-3'>Buy Item</button>
                </Link>
                <Outlet context={{item, user, setAlertMessage}}/>
              </div>
            )}
            {!isBuyer && (
              <div>
                <button onClick={()=>setUpdateForm(!updateForm)}>Update Listing Info</button>
                {updateForm && <UpdateListingForm item={item} setAlertMessage={setAlertMessage}/>}
              </div>
            )}
          </div>
        </div>
        </div>
      </div>
    )
  }
}

export default ListingPage