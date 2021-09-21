const express = require('express')
const app = express()
const { 
  getLinks, 
  getMovies, 
  addMovie, 
  getMovieByNameAndYear 
} = require('./src/db/query')

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.get('/movies', (req, res) => {
  getMovies().then(data => res.send(data))
})
app.post('/movies', (req, res) => {
  getMovieByNameAndYear(req.body).then(data => {
    if (data) {
      res.status(200).send(data[0])
    } else {
      return addMovie(req.body)
    }
  }).then(data => {
    res.status(201).send(data)
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