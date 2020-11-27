const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const products = require('./controllers/products')
const getProduct = require('./controllers/getProduct')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// Get all the products with stock
app.get('/products', (req, res) => {
  products.getList(productList =>
    res.json(productList)
  )
})

// Get all the products with stock
app.get('/products/:id', (req, res) => {
  products.getProduct(
    req.params.id,
    (product) => {
      res.json(product)
    }
  )
})

// Sell a product by id
app.put('/products/:id/sell', (req, res) => {
  products.sellById(
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

const PORT = 3001
app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`)
})
