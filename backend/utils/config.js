require('dotenv').config()

const PORT = process.env.PORT

//set MongoDB to test if NODE_ENV is test environment
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const SECRET = process.env.SECRET

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET
}

