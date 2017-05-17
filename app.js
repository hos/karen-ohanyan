const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const i18n = require('i18n')
const compression = require('compression')

const index = require('./routes/index')

const app = express()

i18n.configure({
  locales: ['en', 'hy', 'ru'],
  directory: path.join(__dirname, '/locales'),
  defaultLocale: 'en',
  cookie: 'i18n'
})

app.set('views', [path.join(__dirname, 'views'), path.join(__dirname, 'views/biography'), path.join(__dirname, 'views/articles')])
app.set('view engine', 'pug')

app.use(compression())
app.use(i18n.init)
app.use((req, res, next) => {
  const match = req.url.match(/^\/([A-Z]{2})([/?].*)?$/i)
  if (match) {
    req.setLocale(match[1])
    req.url = match[2] || '/'
  } else {
    req.setLocale('en')
  }
  next()
})

process.env.NODE_ENV !== 'production' && app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.get('robots.txt', (req, res) => res.sendFile(path.join(__dirname, 'public/robots.txt')))
app.use(express.static(path.join(__dirname, 'public'), { maxage: '100d' }))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/', index)

module.exports = app
