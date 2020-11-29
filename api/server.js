const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const getProduct = require('./controllers/getProduct')
const sellProduct = require('./controllers/sellProduct')
const getAllProductsStock = require('./controllers/getAllProductsStock')
const getAll = require('./controllers/promiseGetProduct')
const {getProductsFile} = require('./data/promiseProducts')

const { PORT, HOST } = require('../config')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// Get all the products with stock
app.get('/products', (req, res) => {
  getAllProductsStock.getList(productList =>
    res.json(productList)
  )
})

// Get all the products with stock
app.get('/products/:id', (req, res) => {
  getProduct.getProduct(
    req.params.id,
    (product) => {
      res.json(product)
    }
  )
})

// Sell a product by id
app.put('/products/:id/sell', (req, res) => {
  sellProduct.sellById(
    req.params.id,
    (prodAvailable) => {
      if (prodAvailable) {
        res.status(200).json({ response: 'inventory updated' })
      } else {
        res.status(200).json({ response: 'product stock not available' })
      }
    }
  )
})

// use promise to return products
app.get('/promiseProd', (req, res) => {
  //getAll.handleGetProducts()
  getProductsFile()
  .then(results => {
    res.status(200)
    .json({
      status: 'success',
      data: results,
      message: 'retrieved all products'
    })
  })
  .catch(err => res.status(400).json('error getting products'))
})

app.listen(PORT, () => {
  console.log(`app is running on http://${HOST}:${PORT}`)
})
