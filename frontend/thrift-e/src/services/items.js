import axios from 'axios'

const baseUrl = 'http://localhost:3001'

axios.defaults.withCredentials = true

const getAllItems = async () => {
  const req = await axios.get(`${baseUrl}/api/items`)
  return req.data
}

const postNewItem = async (itemDetails) => {
  const req = await axios.post(`${baseUrl}/api/items`, itemDetails)
  return req.data
}

const updateItem = async (itemDetails, id) => {
  const req = await axios.put(`${baseUrl}/api/items/${id}`, itemDetails)
  return req.data
}

const deleteItem = async (itemDetails, id) => {
  const req = await axios.put(`${baseUrl}/api/items/${id}`, itemDetails)
  return req.data
}

export default { getAllItems, postNewItem, updateItem, deleteItem }