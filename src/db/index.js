const sqlite3 = require('sqlite3')
const path = require('path')

const dbFilePath = path.join(__dirname, 'db.sqlite')
const db = new sqlite3.Database(dbFilePath)

module.exports = db