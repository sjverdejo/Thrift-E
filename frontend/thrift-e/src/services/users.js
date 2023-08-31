import axios from 'axios'

const baseUrl = 'http://localhost:3001'
axios.defaults.withCredentials = true

const getUser = async (id) => {
  const req = await axios.get(`${baseUrl}/api/users/${id}`)
  return req.data
}

const updateUser = async (id, updatedUser) => {
  const req = await axios.put(`${baseUrl}/api/users/${id}`, updatedUser)
  return req.data
}

const deleteUser = async (id) => {
  const req = await axios.delete(`${baseUrl}/api/users/${id}`)
  return req.data
}

export default { getUser, updateUser, deleteUser }