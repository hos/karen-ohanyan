import { dirname } from 'path'
import { fileURLToPath } from 'url'

import i18n from 'i18n'

export const port = process.env.PORT || 3000

export const srcDir = dirname(fileURLToPath(import.meta.url))

export const publicDir = i18n.configure({
  locales: ['en', 'hy', 'ru'],
  directory: `${srcDir}/locales`,
  defaultLocale: 'en',
  cookie: 'i18n'
})
