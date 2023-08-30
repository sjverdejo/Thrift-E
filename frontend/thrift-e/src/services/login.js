import axios from 'axios'

const baseUrl = 'http://localhost:3001'

axios.defaults.withCredentials = true

const register = async (userDetails) => {
  const req = await axios.post(`${baseUrl}/api/users`, userDetails)
  return req.data
}

const login = async (userDetails) => {
  const req = await axios.post(`${baseUrl}/api/login`, userDetails)
  return req.data
}

const checkLoggedIn = async () => {
  const req = await axios.get(`${baseUrl}/api/login`)
  return req.data
}

const logout = async () => {
  const req = await axios.delete(`${baseUrl}/api/logout`)
  return req
}

export default { register, login, checkLoggedIn, logout }