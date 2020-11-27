const productData = require('../data/products')
const inventoryData = require('../data/inventory')

/**
 * Gets product's articles
 * Finds inventory article for each product article
 * Checks how much inventory is available and returns the max number of products available
 */
const getProductStock = (product, inventory) => {
  const productArticles = product.contain_articles

  const productStock = inventory.reduce(
    (maximumStock, article) => {
      const articleRequired = productArticles.find(
        prodArticle => `${prodArticle.art_id}` === `${article.art_id}`
      )

      if (articleRequired) {
        const amountRequired = parseInt(articleRequired.amount_of, 10)
        const articleStock = parseInt(article.stock, 10)

        const quantity = Math.floor(articleStock / amountRequired)

        // if this article has less quantity it will determine how many products I can sell so it should be used as maximum stock
        return maximumStock === null || maximumStock > quantity ? quantity : maximumStock
      } else {
        return maximumStock
      }
    },
    null
  )

  return productStock
}

module.exports = {
  getProductStock,
}
