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
app.post('/movies', async (req, res) => {
  const rows = await getMovieByNameAndYear(req.body)
  if (rows) {
    res.status(200).send(rows[0])
  } else {
    await addMovie(req.body)
    res.status(201).send(req.body)
  }
})

app.get('/links', (req, res) => {
  getLinks().then(data => res.send(data))
})

app.listen(port, () => {
  console.log('listening at port ' + port)
})