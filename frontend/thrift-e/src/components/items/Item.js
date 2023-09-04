import Void from '../../assets/void.png'

const Item = ({item}) => {
  return (
    <div class='flex flex-col w-full'>
      {item.itemImages.length !== 0 ? <img class='border h-72 w-94 mx-auto' src={process.env.REACT_APP_S3 + item.itemImages[0]} alt='Item' /> : <img class='w-94 h-72 mx-auto' src={Void} alt='nothing provided'/>}
      <div class='flex justify-between m-1'>
        <h1 class='text-3xl'>{item.name}</h1>
        <h1 class='text-3xl'>${item.price}</h1>
      </div>
    </div>
  )
}

export default Item