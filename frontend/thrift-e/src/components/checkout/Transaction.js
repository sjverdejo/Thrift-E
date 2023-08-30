import { Link } from 'react-router-dom'

const Transaction = ({transaction, isSeller}) => {
  const seller = () => {
    return (
      <div>
        <h2>Date Sold: {transaction.datePurchased}</h2>
        <h3>{transaction.item.seller}</h3>
        <Link to={`/user/${transaction.buyer}`}><button>View Buyer Profile</button></Link>
      </div>
    )
  }

  const buyer = () => {
    return (
      <div>
        <h2>Date Purchased: {transaction.datePurchased}</h2>
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