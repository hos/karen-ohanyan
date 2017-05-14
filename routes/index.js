const express = require('express')
const router = express.Router()
const albums = require('../lib/albums')
const imageManager = require('../lib/image-manager')
const fs = require('fs')
const path = require('path')

const css = fs.readFileSync(path.join(__dirname, '../public/stylesheets/styles.css'), 'utf8').replace(/\s+/g, ' ')
const js = fs.readFileSync(path.join(__dirname, '../public/javascripts/main.js'), 'utf8').replace(/\s+/g, ' ')

router.get('/:album/:imageName?', (req, res, next) => {
  const album = req.params.album
  const imageName = req.params.imageName
  const startYear = parseInt(album.split('-')[0], 10)
  if (!startYear) return next()
  const endYear = parseInt(album.split('-')[1], 10)
  const albumImages = endYear ? imageManager.getByYears([startYear, endYear]) : imageManager.getByYear([startYear])
  const selectedImage = albumImages.find(img => img.fileName === (imageName + '.jpg')) || albumImages[0]
  res.render('album', {
    js,
    css,
    albums,
    i18n: res,
    albumImages,
    url: req.url,
    selectedImage,
    currentUrl: req.url.replace('/' + imageName, '')
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

module.exports = router
