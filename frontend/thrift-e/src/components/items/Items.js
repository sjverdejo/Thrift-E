import { Link } from 'react-router-dom'
import Item from './Item'
import Void from '../../assets/void.png'
const Items = ({items}) => {
  return (
    items.map(i => (
      <div key={i._id}>
        <Item item={i} />
        {i.itemImages.length !== 0 ? <img src={process.env.REACT_APP_S3 + i.itemImages[0]} width={50} /> : <img src={Void} width={50} />}
        <Link to={`/listing/${i._id}`}>View Listing</Link>
      </div>
    ))
  )
}

export default Items

