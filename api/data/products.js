const fs = require('fs')
const path = require('path')

const PRODUCT_FILE_PATH = '../../files/products.json'

const getById = (params, callback) => {
  const productId = params['id']
  
  fs.readFile(path.join(__dirname, PRODUCT_FILE_PATH), (err, data) => {
    const products = JSON.parse(data)
    const product = products['products'].find(el => el.id === Number(productId))
    if (err) throw err
    callback(product)
  })
}

const getList = (callback) => {
  fs.readFile(path.join(__dirname, PRODUCT_FILE_PATH), (err, data) => {
    if (err) throw err
    callback(JSON.parse(data))
  })
}


module.exports = {
  getById,
  getList
}