const express = require('express')
const router = express.Router()
const albums = require('../lib/albums')
const fs = require('fs')
const path = require('path')

const css = fs.readFileSync(path.join(__dirname, '../public/stylesheets/styles.css'), 'utf8').replace(/\s+/g, ' ')
const js = fs.readFileSync(path.join(__dirname, '../public/javascripts/main.js'), 'utf8').replace(/\s+/g, ' ')
const bootstrap = fs.readFileSync(path.join(__dirname, '../public/stylesheets/bootstrap.min.css'), 'utf8').replace(/\s+/g, ' ')

const articles = {
  'vardan-jaloyan-body-investment': 'vjbi',
  'from-avant-garde-to-avant-garde-elena-aydinyan': 'fata',
  'real-utopias-gohar-vardanyan': 'rugv',
  'real-utopias-vardan-azatyan': 'ruva',
  'walls-eva-khachatryan': 'wek'
}

router.get('/:articleName', function (req, res, next) {
  const articleName = req.params.articleName
  if (!articleName) return next()
  res.render('articles/' + articles[articleName] + '-' + req.getLocale(), {
    js,
    css,
    albums,
    i18n: res,
    bootstrap,
    url: `/articles/${articleName}`
  })
})

router.get('/', function (req, res, next) {
  res.render('articles/articles-' + req.getLocale(), {
    js,
    css,
    albums,
    i18n: res,
    bootstrap,
    url: '/articles'
  })
})

module.exports = router
