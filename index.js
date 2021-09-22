const express = require('express')
const app = express()
const { 
  selectLinks, 
  selectMovies, 
  addLink
} = require('./src/db/query')
const {
  addMovie
} = require('./src/movies')

const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.send('helloooo')
})

app.get('/movies', (req, res) => {
  selectMovies().then(data => res.send(data))
})
app.post('/movies', async (req, res, next) => {
  try {
    const { status, data } = await addMovie(req.body)
    res.status(status).send(data)
  } catch(e) {
    next(e)
  }
})

app.get('/links', (req, res) => {
  selectLinks().then(data => res.send(data))
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
  console.log(err.stack)
  res.status(500).send(err.message)
})

app.listen(port, () => {
  console.log(`listening at port ${port}`)
})