const productData = require('../data/products')
const inventoryData = require('../data/inventory')


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
        stock: getProductStock(dataProduct, inventory)
      })
    })
  })
}


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

/**
 * Get all the products
 * get all the products stock
 */
const getList = (callback) => {
  productData.getList(prodData => {
    const products = prodData.products

    inventoryData.getList(invtData => {
      const inventory = invtData.inventory

      const transformedProductList = products.map(product => ({
        name: product.name,
        id: product.id,
        stock: getProductStock(product, inventory)
      }))

      callback(transformedProductList)
    })
  })
}

/**
 * Gets a product from the list by id
 * using the amount_of on the articles, reduces the stock of the article by the amount
 */
const sellById = (productId, onDone) => {
  productData.getById(productId, product => {
    const productArticles = product.contain_articles

    inventoryData.getList(invtData => {
      const inventory = invtData.inventory

      const stock = getProductStock(product, inventory)
      if (stock > 1) {
        inventoryData.updateAmounts(productArticles, () => onDone(true))
      } else {
        onDone(false)
      }
    })
  })
}

module.exports = {
  //getProduct,
  getProductStock,
  sellById,
  getList
}
