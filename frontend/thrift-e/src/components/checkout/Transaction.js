import { Link } from 'react-router-dom'
import helper from '../../helper'

const Transaction = ({transaction, isSeller}) => {
  const seller = () => {
    return (
      <div>
        <h4>Date Sold: {helper.convertDate(transaction.datePurchased)}</h4>
        <Link to={`/user/${transaction.buyer}`}><button>View Buyer Profile</button></Link>
      </div>
    )
  }

  const buyer = () => {
    return (
      <div>
        <h4>Date Purchased: {helper.convertDate(transaction.datePurchased)}</h4>
        <Link to={`/user/${transaction.item.seller}`}><button>View Seller Profile</button></Link>
      </div>
    )
  }

  return (
    <div>
      <h1>{transaction.item.name}</h1>
      <h3>{transaction.item.price}</h3>
      {
        isSeller
          ? seller()
          : buyer()
      }
    </div>    
  )
}

export default Transaction