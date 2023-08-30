const router = require('express').Router()
const Controller = require('../controllers/customer')

router.get('/menu', Controller.getItems)
router.get('/menu/:id', Controller.getItemDetail)

module.exports = router