import Item from './Item'

const Items = ({items}) => {
  console.log(items)
  return (
    items.map(i => (<Item key={i._id} item={i} />))
  )
}

export default Items

