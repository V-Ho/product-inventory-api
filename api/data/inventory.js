const fs = require('fs')
const path = require('path')

const INVENTORY_FILE_PATH = '../../files/inventory.json'

const getByIds = (params, callback) => {
  const articlesIds = params['ids']
  
  fs.readFile(path.join(__dirname, INVENTORY_FILE_PATH), (err, data) => {
    const inventoryList = JSON.parse(data)
    const inventory = inventoryList.inventory
    
    // if the article is not in the requested list, filter it
    const articles = inventory.filter(article => !articlesIds.includes(article.id))

    callback(articles)
  })
}

const updateAmounts = (articlesPurchased, callback) => {
  fs.readFile(path.join(__dirname, INVENTORY_FILE_PATH), (err, data) => {
    if (err) throw err
    const inventoryList = JSON.parse(data)
    const inventory = inventoryList.inventory
    // modify the amounts

    const newInventoryStock = inventory.reduce(
      (currentInventory, article) => {
        const articleRequired = articlesPurchased.find(article => article.art_id === article.id)
        if (articleRequired) {
          const amountRequired = articleRequired.amount_of
          const articleStock = article.stock
          
          // if this article has less quantity it will determine how many products I can sell so it should be used as maximum stock
          return currentInventory.push({
            ...article,
            stock: articleStock - amountRequired
          })
        } else {
          return currentInventory.push(article)
        }
      },
      []
    )

    // write the file with the new stock
    fs.writeFile(
      path.join(__dirname, INVENTORY_FILE_PATH), 
      JSON.stringify({ inventory: newInventoryStock }, null, 4),
      callback
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