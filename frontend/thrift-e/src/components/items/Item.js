import Void from '../../assets/void.png'

const Item = ({item}) => {
  //create function to display all photos
  return (
    <div class='flex flex-col items-center'>
      {item.itemImages.length !== 0 ? <img class='border h-96 w-94 mx-auto' src={process.env.REACT_APP_S3 + item.itemImages[0]} alt='Item' /> : <img class='w-94 h-96 mx-auto' src={Void} alt='nothing provided'/>}
      <h1 class='text-3xl'>{item.name}</h1>
      <h3>${item.price}</h3>
    </div>
  )
}

export default Item