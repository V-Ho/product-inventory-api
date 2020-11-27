const inventoryData = require('../data/inventory')
const productData = require('../data/products')
const products = require('./products')

/**
 * Get all the products
 * get all the products stock
 */

const getList = (callback) => {
  productData.getList(prodData => {
    const productList = prodData.products

    inventoryData.getList(invtData => {
      const inventory = invtData.inventory

      const transformedProductList = productList.map(product => ({
        name: product.name,
        id: product.id,
        stock: products.getProductStock(product, inventory)
      }))

      callback(transformedProductList)
    })
  })
}

module.exports = {
  getList
}