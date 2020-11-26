const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const products = require('./controllers/products')

const app = express()
app.use(bodyParser.json())
app.use(cors())

// Get all the products with stock
app.get('/products', (req, res) => { 
  products.getList(productList => 
    res.send(JSON.stringify(productList))
  )
})

// Sell a product by id
app.put('/products/:id/sell', (req, res) => {
  products.sellById(
    req.params['id'], 
    (ok) => {
      if (ok) {
        res.status(200).send(`{ "response": "inventory updated" }`)
      } else {
        res.status(200).send(`{ "response": "product stock not available" }`)
      }
    }
  )
})

const PORT = 3001
app.listen(PORT, () => {
  console.log(`app is running on PORT ${PORT}`)
})