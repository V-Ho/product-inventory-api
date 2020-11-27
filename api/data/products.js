const fs = require('fs')
const path = require('path')

const PRODUCT_FILE_PATH = '../../files/products.json'

const getById = (productId, callback) => {
  fs.readFile(path.join(__dirname, PRODUCT_FILE_PATH), (err, data) => {
    if (err) throw new Error('error reading file')
    const products = JSON.parse(data)
    const product = products.products.find(el => el.id === Number(productId))
    callback(product)
  })
}

const getList = (callback) => {
  fs.readFile(path.join(__dirname, PRODUCT_FILE_PATH), (err, data) => {
    if (err) throw new Error('error reading file')
    callback(JSON.parse(data))
  })
}

module.exports = {
  getById,
  getList
}
