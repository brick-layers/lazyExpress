class Index {
  constructor (paths) {
    this.paths = paths
    this.output = ''

    this.addHeader()
    this.addPaths()
    this.addFooter()
  }

  addHeader () {
    this.output += `const api = require('express').Router()

    `
  }
  addPaths () {
    this.paths.forEach(path => {
      this.output += `api.use('/${path.pluralName}', require('./${
        path.pluralName
      }'))
      `
    })
    this.output += '\n'
  }
  addFooter () {
    this.output += `api.use((req, res) => {
      res.sendStatus(404)
    })

    module.exports = api
    `
  }
}

module.exports = Index
