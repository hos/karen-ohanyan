import express from 'express'
import i18n from 'i18n'
import logger from 'morgan'

import router from './router'
import { port, srcDir } from './config'

const app = express()

app.set('views', [`${srcDir}/views`])
app.set('view engine', 'pug')

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
app.use(logger('dev'))
app.use(express.static(`${srcDir}/public`, { maxage: '100d' }))
app.use('/', router)

app.listen(port, () => {
  console.log('listening on port ' + port)
})
