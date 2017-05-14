const express = require('express')
const router = express.Router()
const albums = require('../lib/albums')
const imageManager = require('../lib/image-manager')
const fs = require('fs')
const path = require('path')

const css = fs.readFileSync(path.join(__dirname, '../public/stylesheets/styles.css'), 'utf8').replace(/\s+/g, ' ')
const js = fs.readFileSync(path.join(__dirname, '../public/javascripts/main.js'), 'utf8')
const bootstrap = fs.readFileSync(path.join(__dirname, '../public/stylesheets/bootstrap.min.css'), 'utf8').replace(/\s+/g, ' ')

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
    bootstrap,
    albums,
    album,
    css,
    js
  })
})

router.get('/biography', (req, res, next) => {
  res.render('biography-' + req.getLocale(), { albums, i18n: res, url: req.url, css, js, bootstrap })
})

router.get('/exhibitions', (req, res, next) => {
  res.render('exhibitions', { albums, i18n: res, url: req.url, css, js, bootstrap })
})

router.get('/contacts', (req, res, next) => {
  res.render('contacts', { albums, i18n: res, url: req.url, css, js, bootstrap })
})

router.get('/', (req, res, next) => {
  res.render('index', { albums, i18n: res, url: req.url, css, js, bootstrap })
})

module.exports = router
