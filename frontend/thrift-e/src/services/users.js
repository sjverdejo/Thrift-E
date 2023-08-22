import axios from 'axios'

const baseUrl = 'http://localhost:3001'
axios.defaults.withCredentials = true

const getUser = async (id) => {
  const req = await axios.get(`${baseUrl}/api/users/${id}`)

  return req.data
}

export default { getUser }