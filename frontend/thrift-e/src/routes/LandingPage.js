import LoginForm from '../components/login/LoginForm' 

const LandingPage = ({setUser, setAlertMessage}) => {
  return (
    <div className='flex flex-col justify-center items-center'>
      <h1 className='text-3xl'>Welcome! To enter please sign in below!</h1>
      <LoginForm setUser={setUser} setAlertMessage={setAlertMessage}/>
    </div>
  )
}

export default LandingPage