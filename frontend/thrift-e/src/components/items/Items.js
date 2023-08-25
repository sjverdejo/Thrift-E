import { Link } from 'react-router-dom'
import Item from './Item'

const Items = ({items}) => {
  return (
    items.map(i => (
      <div key={i._id}>
        <Item item={i} />
        <Link to={`/listing/${i._id}`}>View Listing</Link>
      </div>
    ))
  )
}

export default Items

