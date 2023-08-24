import LoginForm from '../components/login/LoginForm' 

const LandingPage = ({setUser}) => {
  return (
    <div>
      <h1>Welcome! To enter please sign in below!</h1>
      <LoginForm setUser={setUser} />
    </div>
  )
}

export default LandingPage