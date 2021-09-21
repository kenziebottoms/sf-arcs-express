const express = require('express')
const app = express()
const { getLinks, getMovies } = require('./src/db/get')

const port = 3000

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.get('/movies', (req, res) => {
  getMovies().then(data => res.send(data))
})

app.get('/links', (req, res) => {
  getLinks().then(data => res.send(data))
})

app.listen(port, () => {
  console.log('listening at port ' + port)
})