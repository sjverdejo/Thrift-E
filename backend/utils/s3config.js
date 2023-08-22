const config = require('./config')

const {S3Client} = require('@aws-sdk/client-s3')

const s3Config = {
  region: config.REGION,
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_ACCESS_SECRET
  }
}

const s3Client = new S3Client(s3Config)

module.exports = s3Client