const pluralize = require('pluralize')
class Path {
  constructor (name) {
    this.name = name
    this.pluralName = pluralize(this.name).toLowerCase()
    this.filename = this.pluralName + '.js'
    this.output = ''

    this.addHeader()
    this.addFetchAll()
    this.addPostById()
    this.addParams()
    this.addFetchById()
    this.addUpdateById()
    this.addDeleteById()
  }

  addHeader () {
    console.log(this.name, this.filename)
    this.output += `const api = require('express').Router()
    const { ${this.name} } = require('../db/models')

    `
  }
  addFetchAll () {
    this.output += `// GET /api/${this.pluralName}
    api.get('/', (req, res, next) => {
      ${this.name}.findAll()
        .then(${this.pluralName} => {
          res.json(${this.pluralName})
          })
          .catch(next)
    })

    `
  }
  addPostById () {
    const lowerCaseName = this.name.toLowerCase()
    this.output += `// POST /api/${this.pluralName}
    api.post('/', (req, res, next) => {
      ${this.name}.create(req.body)
        .then(${lowerCaseName} => res.status(201).json(${lowerCaseName}))
        .catch(next)
    })

    `
  }
  addParams () {
    const lowerCaseName = this.name.toLowerCase()
    this.output += `// Param fetching for below routes
    api.param('id', (req, res, next, id) => {
      ${this.name}.findById(id)
        .then(${lowerCaseName} => {
          if (!${lowerCaseName}) {
            const err = Error('${this.name} not found')
            err.status = 404
            throw err
          }
          req.${lowerCaseName} = ${lowerCaseName}
          next()
          return null // silences bluebird warning
        })
        .catch(next)
      })

      `
  }
  addFetchById () {
    this.output += `// GET /api/${this.pluralName}/:id
    api.get('/:id', (req, res) => {
      res.json(req.${this.name.toLowerCase()})
    })

    `
  }
  addUpdateById () {
    const lowerCaseName = this.name.toLowerCase()
    this.output += `// PUT /api/${this.pluralName}/:id
    api.put('/:id', (req, res, next) => {
      req.${lowerCaseName}
        .update(req.body)
        .then(${lowerCaseName} => res.status(200).json(${lowerCaseName}))
        .catch(next)
    })

    `
  }
  addDeleteById () {
    const lowerCaseName = this.name.toLowerCase()
    this.output += `// DELETE /api/${this.pluralName}/:id
    api.delete('/:id', (req, res, next) => {
      req.${lowerCaseName}
        .destroy()
        .then(() => res.sendStatus(204))
        .catch(next)
    })

    `
  }
}

module.exports = Path
