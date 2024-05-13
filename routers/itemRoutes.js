const express = require('express')
const router = express.Router()

const itemController = require("../controller/itemController")
const authorization = require('../middleware/authorization')
const pagination = require('../middleware/pagination')

router.post('/',authorization, itemController.addItem)
router.get('/', pagination,itemController.showItem)
router.get('/:id', itemController.showOneItem)
router.put('/:id', authorization,itemController.editItem)
router.delete('/:id', authorization,itemController.deleteItem)

module.exports = router
