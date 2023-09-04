import { Link } from 'react-router-dom'
import Item from './Item'

const Items = ({items}) => {
  return (
    items.map(i => (
      <div class='flex flex-col items-center justify-center border min-w-full min-h-full shadow-xl rounded-md' key={i._id}>
        <Item item={i} />
        <Link class='text-slate-600' to={`/listing/${i._id}`}>View Listing</Link>
      </div>
    ))
  )
}

export default Items

