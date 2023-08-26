import Transaction from "./Transaction"

const Transactions = ({list}) => {
  return (
    list.map(t => <Transaction transaction={t}/>)
  )
}

export default Transactions