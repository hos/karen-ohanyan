const express = require('express')
const router = express.Router()
const albums = require('../lib/albums')

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
    albums,
    i18n: res,
    url: `/articles/${articleName}`
  })
})

router.get('/', function (req, res, next) {
  res.render('articles/articles-' + req.getLocale(), {
    albums,
    i18n: res,
    url: '/articles'
  })
})

module.exports = router
