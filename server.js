const express = require('express')
const hbs = require('express-handlebars')

const routes = require('./routes')
const loginRoute = require('./loginRouter')

const app = express()

const hbsConfig = {
  extname: 'hbs',
  defaultLayout: 'main'
}

app.use(express.static('public'))

app.engine('hbs', hbs(hbsConfig))
app.set('view engine', 'hbs')
app.use('/', routes)
app.use('/', loginRoute)

module.exports = app
