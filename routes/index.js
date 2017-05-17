const express = require('express')
const router = express.Router()
const albums = require('../lib/albums')
const imageManager = require('../lib/image-manager')
const fs = require('fs')
const path = require('path')
const uglify = require('uglify-es')

const css = fs.readFileSync(path.join(__dirname, '../public/stylesheets/styles.css'), 'utf8').replace(/\s+/g, ' ')
const js = uglify.minify(fs.readFileSync(path.join(__dirname, '../public/javascripts/main.js'), 'utf8')).code

router.use((req, res, next) => {
  res.locals.i18n = req
  res.locals.js = js
  res.locals.css = css
  res.locals.albums = albums
  next()
})

router.get('/:albumName/:imageName?', (req, res, next) => {
  const albumName = req.params.albumName
  const imageName = req.params.imageName
  const startYear = parseInt(albumName.split('-')[0], 10)
  const album = albums.find(album => album.href === albumName)
  if (!album) return next()
  if (!startYear) return next()
  const endYear = parseInt(albumName.split('-')[1], 10)
  const albumImages = endYear ? imageManager.getByYears([startYear, endYear]) : imageManager.getByYear([startYear])
  const selectedImage = albumImages.find(img => img.fileName === (imageName + '.jpg')) || albumImages[0]
  res.render('album', {
    currentUrl: req.url.replace('/' + imageName, ''),
    selectedImage,
    url: req.url,
    albumImages,
    album
  })
})

router.get('/biography', (req, res, next) => {
  res.render('biography-' + req.getLocale(), { albums, url: req.url })
})

router.get('/exhibitions', (req, res, next) => {
  res.render('exhibitions', { albums, url: req.url })
})

router.get('/contacts', (req, res, next) => {
  res.render('contacts', { albums, url: req.url })
})

router.get('/', (req, res, next) => {
  res.render('index', { albums, url: req.url })
})

const articles = {
  'vardan-jaloyan-body-investment': 'vjbi',
  'from-avant-garde-to-avant-garde-elena-aydinyan': 'fata',
  'real-utopias-gohar-vardanyan': 'rugv',
  'real-utopias-vardan-azatyan': 'ruva',
  'walls-eva-khachatryan': 'wek'
}

router.get('/articles/:articleName', function (req, res, next) {
  const articleName = req.params.articleName
  if (!articleName) return next()
  res.render('articles/' + articles[articleName] + '-' + req.getLocale(), {
    url: `/articles/${articleName}`,
    albums
  })
})

router.get('/articles/', function (req, res, next) {
  res.render('articles/articles-' + req.getLocale(), {
    url: '/articles'
  })
})

// catch 404 and forward to error handler
router.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
router.use((err, req, res, next) => {
  // set locals, only providing error in development
  console.error(err)
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 404)
  res.render('error')
})

module.exports = router
