
const Item = ({item}) => {
  console.log(item.name)
  return (
    <>
      <h1>{item.name}</h1>
      <h3>{item.price}</h3>
    </>
  )
}

export default Item