const express = require('express')
const app = express()
const port = 3000

app.use('/api/v1', require('./routes/v1'))
app.use('/api/v2', require('./routes/v2'))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})