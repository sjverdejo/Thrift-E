import { useState, useEffect } from 'react'
import { useParams, useOutletContext, Link, Outlet, useNavigate } from 'react-router-dom'
import Item from '../components/items/Item'
import Void from '../assets/void.png'
const ListingPage = () => {
  const { id } = useParams()
  const { user, allItems, setAlertMessage } = useOutletContext()
  const item = allItems.find(i => i._id === id)
  const imgLink = process.env.REACT_APP_S3
  const [mainImg, setMainImg] = useState('')

  useEffect(() => {
    if (item && item.itemImages) {
      setMainImg(`${imgLink}${item.itemImages[0]}`)
    }
  }, [])
  const imgView = () => {

    return (
    <div>
      <img src={mainImg} width={100} />
      <div>
        {item.itemImages.map(i => <img key={i} src={imgLink + i} width={50} onClick={() => setMainImg(`${imgLink}${i}`)}/>)}
      </div>
    </div>
    )
  }
  const navigate = useNavigate()
  if (item) {
    const isBuyer = item.seller.toString() !== user.user._id && !item.isSold


    return (
      <div>
        <Link to='/listings'>Back to listings</Link>
        {
          item.itemImages.length === 0
            ? <img src={Void} width={50} alt='no image'/>
            : imgView()
        }
        <Item item={item}/>
        <h3>Type: {item.clothingType}</h3>
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
      </div>
    )
  } else {
    setAlertMessage('Item does not exist.')
    navigate('/')
  }
}

export default ListingPage