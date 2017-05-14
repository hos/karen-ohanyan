const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const i18n = require('i18n')
const compression = require('compression')

const index = require('./routes/index')
const articles = require('./routes/articles')

const app = express()

i18n.configure({
  locales: ['en', 'hy', 'ru'],
  directory: path.join(__dirname, '/locales'),
  defaultLocale: 'en',
  cookie: 'i18n'
})

// view engine setup
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
app.use(express.static(path.join(__dirname, 'public'), { maxage: '1d' }))
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

app.use('/', index)
app.use('/articles', articles)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
