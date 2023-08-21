import axios from 'axios'

const baseUrl = 'http://localhost:3001'

axios.defaults.withCredentials = true

const getAllItems = async () => {
  const req = await axios.get(`${baseUrl}/api/items`)
  console.log('HERE', req)
  return req.data
}

export default { getAllItems }