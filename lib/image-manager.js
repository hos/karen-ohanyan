const fs = require('fs')

class DataManager {

  constructor () {
    this.readImages()
    this.readAlbums()
  }

  readImages () {
    let images = '' + fs.readFileSync('./lib/images.json')
    this.images = JSON.parse(images)
    return images
  }

  readAlbums () {
    let albums = '' + fs.readFileSync('./lib/albums.json')
    this.albums = JSON.parse(albums)
    return albums
  }

  getByYear (year) {
    if (this.images.length < 1) {
      console.error('there are no images')
      return false
    }

    let images = this.images
    let output = []

    for (let i = 0; i < images.length; i++) {
      if (images[i].year === year[0]) {
        output.push(images[i])
      }
    }

    return output
  }

  getByYears (years) {
    if (this.images.length < 1) {
      console.error('there are no images')
      return false
    }

    let images = this.images
    let output = []

    for (let i = 0; i < images.length; i++) {
      if (images[i].year >= years[0] && images[i].year <= years[1]) {
        output.push(images[i])
      }
    }

    return output
  }

  getImages (years) {
    if (years.length === 1) {
      return this.getByYear(years)
    }
    if (years.length === 2) {
      return this.getByYears(years)
    }
  }

  getAlbums () {
    let albums = this.albums

    for (let i in albums) {
      albums[i].images = this.getImages(albums[i].years)
    }
    return albums
  }

}

module.exports = new DataManager()
