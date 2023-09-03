import LoginForm from '../components/login/LoginForm' 

const LandingPage = ({setUser, setAlertMessage}) => {
  return (
    <div class='flex flex-col items-center pt-10'>
      <LoginForm setUser={setUser} setAlertMessage={setAlertMessage}/>
    </div>
  )
}

export default LandingPage