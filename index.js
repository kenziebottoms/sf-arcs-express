const express = require('express')
const app = express()
const { getLinks, getMovies, addMovie } = require('./src/db/query')

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.get('/movies', (req, res) => {
  getMovies().then(data => res.send(data))
})
app.post('/movies', (req, res) => {
  addMovie(req.body).then(() => {
    res.send(req.body)
  }).catch(e => {
    console.log(e)
    res.status(500).send(e)
  })
})

app.get('/links', (req, res) => {
  getLinks().then(data => res.send(data))
})

app.listen(port, () => {
  console.log('listening at port ' + port)
})