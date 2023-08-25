import { Link, useParams } from 'react-router-dom'
import Void from '../../assets/void.png'

const Item = ({item}) => {
  //create function to display all photos
  return (
    <>
      <h1>Name:{item.name}</h1>
      {item.itemImages.length !== 0 ? <img src={item.itemImages[0]} width={50} /> : <img src={Void} width={50} />}
      <h3>Price: ${item.price}</h3>
    </>
  )
}

export default Item