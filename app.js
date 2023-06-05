const express = require('express')
const app = express()
const port = 3000

app.use('/api/v1', require('./routes/v1'))
app.use('/api/v2', require('./routes/v2'))

app.get('*', (req, res) => {
  // res.status(404).json({message: 'Not found'}) bonne pratique
  res.sendFile(__dirname + '/view/404.html')
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})