const { getProductsFile } = require('../data/promiseProducts')

const handleGetProducts = (req, res) => {
  getProductsFile()
  .then(results => {
    console.log('controller promise')
    res.status(200)
    res.json({
      status: 'success',
      data: results,
      message: 'retrieved all products'
    })
  }).catch(err => res.status(400).json('error getting products'))
}

module.exports = {
  handleGetProducts
}

