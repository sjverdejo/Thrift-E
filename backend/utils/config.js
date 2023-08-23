require('dotenv').config()

const PORT = process.env.PORT

//set MongoDB to test if NODE_ENV is test environment
const MONGODB_URI = process.env.NODE_ENV === 'test'
  ? process.env.TEST_MONGODB_URI
  : process.env.MONGODB_URI

const SECRET = process.env.SECRET

//AWS connection for s3 bucket
const S3IMAGE_URL = process.env.S3IMAGE_URL
const AWS_ACCESS_KEY = process.env.AWS_ACCESS_KEY
const AWS_ACCESS_SECRET = process.env.AWS_ACCESS_SECRET
const AWS_S3_BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
const REGION = process.env.REGION

//Stripe connection API keys
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY

module.exports = {
  PORT,
  MONGODB_URI,
  SECRET,
  S3IMAGE_URL,
  AWS_ACCESS_KEY,
  AWS_ACCESS_SECRET,
  AWS_S3_BUCKET_NAME,
  REGION,
  STRIPE_SECRET_KEY
}

