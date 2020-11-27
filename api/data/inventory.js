const fs = require('fs')
const path = require('path')

const INVENTORY_FILE_PATH = '../../files/inventory.json'

const getByIds = (params, onDone) => {
  const articlesIds = params.ids

  fs.readFile(path.join(__dirname, INVENTORY_FILE_PATH), (err, data) => {
    if (err) throw new Error('error reading file')

    const inventoryList = JSON.parse(data)
    const inventory = inventoryList.inventory

    // if the article is not in the requested list, filter it
    const articles = inventory.filter(article => !articlesIds.includes(article.id))

    onDone(articles)
  })
}

const updateAmounts = (articlesPurchased, onDone) => {
  fs.readFile(path.join(__dirname, INVENTORY_FILE_PATH), (err, data) => {
    if (err) throw err
    const inventoryList = JSON.parse(data)
    const inventory = inventoryList.inventory
    // modify the amounts

    const newInventoryStock = inventory.reduce(
      (currentInventory, article) => {
        const articleRequired = articlesPurchased.find(
          purchasedArticle => purchasedArticle.art_id === article.art_id
        )

        if (articleRequired) {
          const amountRequired = parseInt(articleRequired.amount_of, 10)
          const articleStock = parseInt(article.stock, 10)

          // if this article has less quantity it will determine how many products I can sell so it should be used as maximum stock
          currentInventory.push({
            ...article,
            stock: `${articleStock - amountRequired}`
          })
        } else {
          currentInventory.push(article)
        }
        return currentInventory
      },
      []
    )

    // write the file with the new stock
    fs.writeFile(
      path.join(__dirname, INVENTORY_FILE_PATH),
      JSON.stringify({ inventory: newInventoryStock }, null, 4),
      onDone
    )
  })
}

const getList = (callback) => {
  fs.readFile(path.join(__dirname, INVENTORY_FILE_PATH), (err, data) => {
    if (err) throw err
    const inventoryList = JSON.parse(data)
    callback(inventoryList)
  })
}

module.exports = {
  getByIds,
  getList,
  updateAmounts
}
