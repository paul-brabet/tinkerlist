const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
  res.render('index')
})

// router.get('/callback', (req, res) => {
//   res.render('callback')
// })

module.exports = router
