const config = require('./utils/config')
const express = require('express')
const app = express()

app.listen(config.PORT, () => {
  console.log(`Server listening on ${config.PORT}`)
})