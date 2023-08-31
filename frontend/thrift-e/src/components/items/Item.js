const Item = ({item}) => {
  //create function to display all photos
  return (
    <>
      <h1>Name:{item.name}</h1>
      <h3>Price: ${item.price}</h3>
    </>
  )
}

export default Item