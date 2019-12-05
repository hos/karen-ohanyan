import images from './images.data'

export { default as albums } from './albums.data'
export { default as articles } from './articles.data'

export { images }

export default {
  byYear (year) {
    if (images.length < 1) {
      console.error('there are no images')
      return false
    }

    const output = []

    for (let i = 0; i < images.length; i++) {
      if (images[i].year === year[0]) {
        output.push(images[i])
      }
    }

    return output
  },

  byYears (years) {
    if (images.length < 1) {
      console.error('there are no images')
      return false
    }

    const output = []

    for (let i = 0; i < images.length; i++) {
      if (images[i].year >= years[0] && images[i].year <= years[1]) {
        output.push(images[i])
      }
    }

    return output
  }
}
