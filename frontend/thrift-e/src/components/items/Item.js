import { Link } from 'react-router-dom'
import Void from '../../assets/void.png'

const Item = ({item}) => {


  //create function to display all photos
  return (
    <>
      <h1>Name:{item.name}</h1>
      <h3>Price: ${item.price}</h3>
      <h3>Date Posted:{item.datePosted}</h3>
      {item.itemImages.length !== 0 ? <p>display all photos</p> : <img src={Void} width={50} />}
      {/*Link to Seller Profile*/}
      <Link to={`/user/${item.seller}`}><h2>Check Seller Profile</h2></Link>
      <button>Quick Buy</button>
      <button>View</button>
    </>
  )
}

export default Item