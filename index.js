const express = require('express')
const app = express()
const { getAll } = require('./src/db/get')

const port = 3000

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.get('/movies', (req, res) => {
  getAll().then(data => res.send(data))
})

app.listen(port, () => {
  console.log('listening at port ' + port)
})