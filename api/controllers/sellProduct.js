const inventoryData = require('../data/inventory')
const productData = require('../data/products')
const products = require('./products')

/**
 * Gets a product from the list by id
 * using the amount_of on the articles, reduces the stock of the article by the amount
 */

const sellById = (productId, onDone) => {
  productData.getById(productId, product => {
    const productArticles = product.contain_articles

    inventoryData.getList(invtData => {
      const inventory = invtData.inventory

      const stock = products.getProductStock(product, inventory)
      if (stock > 1) {
        inventoryData.updateAmounts(productArticles, () => onDone(true))
      } else {
        onDone(false)
      }
    })
  })
}

module.exports = {
  sellById
}