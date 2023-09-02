

const AlertMessage = ({message, setMessage, setShowAlert}) => {
  return (
    <div class='fixed border max-w-sm mx-auto inset-x-0 top-60 p-6 bg-white flex flex-col items-center rounded-xl shadow-lg'>
      <div class='pb-5 text-xl font-medium'>{message}</div>
      <button class='bg-slate-800 w-40 p-1 rounded-full shadow-lg text-white hover:bg-slate-600 active:bg-slate-800' onClick={()=> {
        setMessage('')
        setShowAlert(false)
      }}>Ok</button>
    </div>
  )
}

export default AlertMessage