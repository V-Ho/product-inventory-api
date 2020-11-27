/**
 * Gets product's articles
 * Finds inventory article for each product article
 * Checks how much inventory is available and returns the max number of products available
 */

const getProductStock = (product, inventory) => {
  const productArticles = product.contain_articles

  if (!productArticles) {
    throw new Error('error retrieving product articles')
  }

  const productStock = inventory.reduce((maximumStock, article) => {
      const articleRequired = productArticles.find(
        prodArticle => `${prodArticle.art_id}` === `${article.art_id}`
      )

      if (articleRequired) {
        const amountRequired = parseInt(articleRequired.amount_of, 10)
        const articleStock = parseInt(article.stock, 10)
        const quantity = Math.floor(articleStock / amountRequired)

        // lowest stock to amount required ratio determines the product's maximum stock available to be purchased
        return maximumStock === null || maximumStock > quantity ? quantity : maximumStock
      } else {
        return maximumStock
      }
    },
    null
  )
  if (!productStock) {
    throw new Error('error calculating product stock')
  }
  return productStock
}

module.exports = {
  getProductStock,
}
