const productData = require('../data/products')
const inventoryData = require('../data/inventory')

/*
const getListStock = (req, res, allProdStock) => {
  allProdStock()
  .then(result => res.send(result))
}
*/
/*
const // = (params, callback) => {
  productData.getById(
    params['id'],
    dataProduct => {
      callback({
        name: dataProduct.name,
        id: dataProduct.id
      })
    }
  )
}
*/

const getProductStock = (product, inventory) => {
  const productArticles = product.contain_articles

  const productStock = inventory.reduce(
    (maximumStock, article) => {
      const articleRequired = productArticles.find(article => inventory.art_id === article.art_id)
      console.log({articleRequired})
      //console.log({productArticles})
      if (articleRequired) {
        const amountRequired = articleRequired.amount_of
        const articleStock = article.stock
        
        const quantity = Math.floor(articleStock / amountRequired)

        // if this article has less quantity it will determine how many products I can sell so it should be used as maximum stock
        console.log({quantity})
        // return maximumStock > quantity ? quantity : maximumStock
         maximumStock > quantity ? quantity : maximumStock
         console.log({maximumStock, quantity})
      } else {
        console.log({maximumStock})
        return maximumStock
      }
    },
    0
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
    console.log({products})

    inventoryData.getList(invtData => {
      const inventory = invtData.inventory
      console.log({inventory})
      
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
const sellById = (productId, callback) => {
  productData.getById(productId, product => {
    const productArticles = product.contain_articles

    inventoryData.getList(invtData => {
      const inventory = invtData.inventory

      const stock = getProductStock(product, inventory)
      if (stock > 1) {
        inventoryData.updateAmounts(productArticles, () => callback(true))
      } else {
        callback(false)
      }
    })

  })
}

module.exports = {
  // getListStock,
  //getById,
  sellById,
  getList
}