import express from 'express'

import data, { albums, articles } from './data'

export default express
  .Router()
  .use((req, res, next) => {
    res.locals.i18n = req
    res.locals.albums = albums
    next()
  })

  .get('/:albumName/:imageName?', (req, res, next) => {
    const albumName = req.params.albumName
    const imageName = req.params.imageName
    const startYear = parseInt(albumName.split('-')[0], 10)
    const album = albums.find(album => album.href === albumName)

    if (!album) {
      return next()
    }

    if (!startYear) {
      return next()
    }

    const endYear = parseInt(albumName.split('-')[1], 10)
    const albumImages = endYear
      ? data.byYears([startYear, endYear])
      : data.byYear([startYear])

    const selectedImage =
      albumImages.find(img => img.fileName === imageName + '.jpg') ||
      albumImages[0]

    res.render('album', {
      currentUrl: req.url.replace('/' + imageName, ''),
      selectedImage,
      url: req.url,
      albumImages,
      album
    })
  })

  .get('/biography', (req, res, next) => {
    res.render(`${req.getLocale()}/biography`, { albums, url: req.url })
  })

  .get('/exhibitions', (req, res, next) => {
    res.render('exhibitions', { albums, url: req.url })
  })

  .get('/contacts', (req, res, next) => {
    res.render('contacts', { albums, url: req.url })
  })

  .get('/', (req, res, next) => {
    res.render('index', { albums, url: req.url })
  })

  .get('/articles/:articleName', (req, res, next) => {
    const articleName = req.params.articleName

    if (!articleName) {
      return next()
    }

    res.render(`${req.getLocale()}/articles/${articles[articleName]}`, {
      url: `/articles/${articleName}`,
      albums
    })
  })

  .get('/articles/', (req, res, next) => {
    res.render(`${req.getLocale()}/articles/articles`, {
      url: '/articles'
    })
  })

  // catch 404 and forward to error handler
  .use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  // error handler
  .use((err, req, res, next) => {
    // set locals, only providing error in development
    console.error(err)
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 404)
    res.render('error')
  })
