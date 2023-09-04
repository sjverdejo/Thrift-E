import { Link } from "react-router-dom"
import HomeImg from '../assets/home.jpg'

const Home = () => {
  return (
    <div class='flex flex-col items-center justify-center bg-cover h-screen pb-40' style={{backgroundImage: `url(${HomeImg})`}}>
      <h1 class='text-6xl text-slate-800 font-normal drop-shadow-md'>Thrift-E</h1>
      <p class='text-xl text-slate-600 italic drop-shadow-md'>Buy and Sell Used Clothing!</p>
      <button class='bg-slate-800 text-white p-2 rounded-md shadow-xl mt-5'><Link to='/listings'>View All Items For Sale</Link></button>
    </div>
  )
}

export default Home