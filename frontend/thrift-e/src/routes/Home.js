import { useOutletContext, Link } from "react-router-dom"

const Home = () => {
  return (
    <div>
      <h1>Welcome to Thrift-E!</h1>
      <h2>Buy and Sell Used Clothing!</h2>
      <Link to='/listings'>View All Items For Sale</Link>
      <Link to={`/create`}>Post an Item to Sell!</Link>
    </div>
  )
}

export default Home