const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')
const router = require('express').Router()
const Controller = require('../controllers/admin')

router.post('/login', Controller.login)
router.post('/register', Controller.register)

router.use(authentication)

router.get('/category', Controller.getCategories)
router.get('/category/:id', Controller.getCategoryById)
router.post('/category/add', Controller.createCategory)
router.delete('/category/delete/:id', Controller.deleteCategory)
router.put('/category/edit/:id', Controller.editCategory)

router.post('/menu/add', Controller.createItem)
router.get('/menu', Controller.getItems)
router.get('/menu/:id', Controller.getItemById)
router.delete('/menu/delete/:id', Controller.deleteItem)
router.put('/menu/edit/:id', Controller.editItem)

module.exports = router