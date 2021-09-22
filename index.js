const express = require('express')
const app = express()
const { 
  getLinks, 
  getMovies, 
  addMovie, 
  getMovieByNameAndYear, 
  addLink
} = require('./src/db/query')

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.get('/movies', (req, res) => {
  getMovies().then(data => res.send(data))
})
app.post('/movies', async (req, res, next) => {
  try {
    const rows = await getMovieByNameAndYear(req.body)
    if (rows) {
      res.status(200).send(rows[0])
    } else {
      await addMovie(req.body)
      res.status(201).send(req.body)
    }
  } catch(e) {
    next(e)
  }
})

app.get('/links', (req, res) => {
  getLinks().then(data => res.send(data))
})
app.post('/links', async (req, res, next) => {
  try {
    await addLink(req.body)
    res.sendStatus(201)
  } catch (e) {
    next(e)
  }
})

app.use(function(err, req, res, next) {
  console.log(err.stack);
  res.status(500).send(err.message)
})

app.listen(port, () => {
  console.log('listening at port ' + port)
})