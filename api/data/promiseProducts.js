const fs = require('fs')
const path = require('path')

const PRODUCT_FILE_PATH = '../../files/products.json'

// Using promises
const getProductsFile = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, PRODUCT_FILE_PATH), (err, data) => {
      if (err) {
        reject (err)
        return
      }
      resolve(data)
    })
  })
  .then(data => JSON.parse(data))
  .then(productFile => {
    return productFile.products})
  .catch(err => console.log(err))
}

module.exports = {
  getProductsFile
}