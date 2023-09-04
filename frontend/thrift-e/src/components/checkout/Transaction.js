import { Link } from 'react-router-dom'
import helper from '../../helper'

const Transaction = ({transaction, isSeller}) => {
  const seller = () => {
    return (
      <div class='flex justify-between'>
        <h4>Sold: {helper.convertDate(transaction.datePurchased)}</h4>
        <Link to={`/user/${transaction.buyer}`}><button>Buyer Profile</button></Link>
      </div>
    )
  }

  const buyer = () => {
    return (
      <div class='flex justify-between'>
        <h4>Bought: {helper.convertDate(transaction.datePurchased)}</h4>
        <Link to={`/user/${transaction.item.seller}`}><button>Seller Profile</button></Link>
      </div>
    )
  }

  return (
    <div class='border bg-slate-600 w-96 p-2 rounded-lg shadow-lg'>
      <div class='flex justify-between'>
        <h1 class='text-2xl'>{transaction.item.name}</h1>
        <h1 class='text-2xl'>${transaction.item.price}</h1>
      </div>
      {
        isSeller
          ? seller()
          : buyer()
      }
    </div>    
  )
}

export default Transaction