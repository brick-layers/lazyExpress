class Index {
  constructor () {
    this.output = ''
    this.addHeader()
    this.addMiddleware()
    this.addBodyParsing()
    this.addApiRoutes()
    this.addStaticMiddleware()
    this.addSendIndex()
    this.addErrorHandling()
    this.addServerSetup()
  }

  addHeader () {
    this.output += `const path = require('path')
    const express = require('express')
    const volleyball = require('volleyball')
    const bodyParser = require('body-parser')
    const db = require('./db')
    const PORT = process.env.PORT || 8080
    const app = express()
    module.exports = app

    `
  }

  addMiddleware () {
    this.output += `app.use(volleyball)

    `
  }
  addBodyParsing () {
    this.output += `app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))

    `
  }
  addApiRoutes () {
    this.output += `app.use('/api', require('./api'))

    `
  }
  addStaticMiddleware () {
    this.output += `app.use(express.static(path.join(__dirname, '..', 'public')))

    `
  }
  addSendIndex () {
    this.output += `app.use('*', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  `
  }
  addErrorHandling () {
    this.output += `app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

  `
  }
  addServerSetup () {
    this.output += `if (module === require.main) {
      db.sync().then(() => {
        console.log('db synced')
        app.listen(PORT, () => console.log(\`Mixing it up on port $\{PORT}\`))
      })
    }
`
  }
}

module.exports = Index
