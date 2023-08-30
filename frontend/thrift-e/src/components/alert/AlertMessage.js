

const AlertMessage = ({message, setMessage, setShowAlert}) => {
  return (
    <div>
      <h1>{message}</h1>
      <button onClick={()=> {
        setMessage('')
        setShowAlert(false)
      }}>Close</button>
    </div>
  )
}

export default AlertMessage