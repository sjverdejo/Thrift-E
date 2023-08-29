import Transaction from "./Transaction"

const Transactions = ({list, isSeller}) => {
  return (
    list.map(t => <Transaction key={t._id} transaction={t} isSeller={isSeller}/>)
  )
}

export default Transactions