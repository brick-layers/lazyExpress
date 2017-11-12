const fs = require('fs')
const operator = require('./src').operator

const api = (inputFile, outputPath) => {
  fs.readFile(inputFile, (err, data) => {
    if (err) throw err
    operator(outputPath, JSON.parse(data))
  })
}

module.exports = api
