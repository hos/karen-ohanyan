const express = require('express')
const router = express.Router()
const albums = require('../lib/albums')
const imageManager = require('../lib/image-manager')
const fs = require('fs')
const path = require('path')
const uglify = require('uglify-es')

const css = fs.readFileSync(path.join(__dirname, '../public/stylesheets/styles.css'), 'utf8').replace(/\s+/g, ' ')
const js = uglify.minify(fs.readFileSync(path.join(__dirname, '../public/javascripts/main.js'), 'utf8')).code

router.get('/:albumName/:imageName?', (req, res, next) => {
  const albumName = req.params.albumName
  const imageName = req.params.imageName
  const startYear = parseInt(albumName.split('-')[0], 10)
  if (!startYear) return next()
  const endYear = parseInt(albumName.split('-')[1], 10)
  const albumImages = endYear ? imageManager.getByYears([startYear, endYear]) : imageManager.getByYear([startYear])
  const selectedImage = albumImages.find(img => img.fileName === (imageName + '.jpg')) || albumImages[0]
  const album = albums.find(album => album.href.includes(albumName))
  res.render('album', {
    currentUrl: req.url.replace('/' + imageName, ''),
    selectedImage,
    url: req.url,
    albumImages,
    i18n: res,
    albums,
    album,
    css,
    js
  })
})

router.get('/biography', (req, res, next) => {
  res.render('biography-' + req.getLocale(), { albums, i18n: res, url: req.url, css, js })
})

router.get('/exhibitions', (req, res, next) => {
  res.render('exhibitions', { albums, i18n: res, url: req.url, css, js })
})

router.get('/contacts', (req, res, next) => {
  res.render('contacts', { albums, i18n: res, url: req.url, css, js })
})

router.get('/', (req, res, next) => {
  res.render('index', { albums, i18n: res, url: req.url, css, js })
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
    i18n: res,
    albums,
    css,
    js
  })
})

router.get('/articles/', function (req, res, next) {
  res.render('articles/articles-' + req.getLocale(), {
    url: '/articles',
    i18n: res,
    albums,
    css,
    js
  })
})

module.exports = router
