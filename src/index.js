const fs = require('fs')
const prettier = require('prettier')

const Index = require('./_index')
const Path = require('./_path')
const ApiIndex = require('./_paths-index)

const operator = (buildPath, data) => {
  // Create /destination directory
  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath)
  }

  // Create root index file
  const index = new Index()
  writeFile(buildPath, 'index.js', index.output)

  // Create array of Paths
  const paths = Object.keys(data.paths).map(
    key => new Path(key, data.paths[key])
  )

  // Write file for each Path in /api directory
  paths.forEach(path =>
    writeFile(buildPath + '/api', path.filename, path.output)
  )

  // Create /api/index.js file
  const apiIndex = new ApiIndex(paths)
  writeFile(buildPath + '/api', 'index.js', apiIndex.output)
}

const writeFile = (buildPath, fileName, content) => {
  if (!fs.existsSync(buildPath)) {
    fs.mkdirSync(buildPath)
  }
  content = prettier.format(content, { semi: false, singleQuote: true })
  fs.writeFile(`${buildPath}/${fileName}`, content, err => {
    if (err) console.log(err)
  })
}

module.exports = { operator }
