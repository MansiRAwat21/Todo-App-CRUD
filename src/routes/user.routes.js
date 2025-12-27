const { Router } = require("express")
const {create, getAll, getById, deleteById, updateById, login} = require("../controller/user.controller")
const { varify } = require("../utils/token")

const route = Router()

route.post('/create',create)
route.post('/login',login)
route.get('/getAll',varify,getAll)
route.get('/getbyid/:id',getById)
route.delete('/deletebyid/:id',deleteById)
route.put('/update/:id',updateById)


module.exports = route