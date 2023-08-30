import LoginForm from '../components/login/LoginForm' 

const LandingPage = ({setUser, setAlertMessage}) => {
  return (
    <div>
      <h1>Welcome! To enter please sign in below!</h1>
      <LoginForm setUser={setUser} setAlertMessage={setAlertMessage}/>
    </div>
  )
}

export default LandingPage