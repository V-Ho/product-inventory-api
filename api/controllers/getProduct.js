const productData = require('../data/products')
const inventoryData = require('../data/inventory')
const products = require('./products')

const getProduct = (productId, callback) => {
  // Get product by id
  productData.getById(productId, dataProduct => {
    // Get inventory to check stock
    inventoryData.getList(invtData => {
      const inventory = invtData.inventory
      
      callback({
        name: dataProduct.name,
        id: dataProduct.id,
        articles: dataProduct.contain_articles.map(art => ({
          id: art.art_id,
          amount: art.amount_of
        })),
        stock: products.getProductStock(dataProduct, inventory)
      })
    })
  })
}

module.exports = {
  getProduct
}