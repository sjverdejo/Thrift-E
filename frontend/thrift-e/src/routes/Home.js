import { useOutletContext, Link } from "react-router-dom"

const Home = () => {
  const { user } = useOutletContext()
  return (
    <div>
      <h1>Welcome to Thrift-E!</h1>
      <h2>Buy and Sell Used Clothing!</h2>
      {/* Link to log in or sign up*/}
      <Link to='/listings'>View All Items For Sale</Link>
      <Link to={`/user/${user.user._id}`}>My Profile</Link>
      <Link to='/checkout'>Checkout</Link>
    </div>
  )
}

export default Home