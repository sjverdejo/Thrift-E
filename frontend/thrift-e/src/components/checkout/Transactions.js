import Transaction from "./Transaction"

const Transactions = ({list, isSeller}) => {
  return (
    list.map(t => <Transaction transaction={t} isSeller={isSeller}/>)
  )
}

export default Transactions