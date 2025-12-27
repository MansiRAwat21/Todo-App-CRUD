const { Router } = require("express");
const { create, getAllByEmail, getAll, findAndUpdate, deleteTodo,getTodoSummaryByUser } = require("../controller/todo.controller");

const todoroute = Router()
todoroute.post('/createtodo', create)
todoroute.get('/gettodo/:owner_id', getAllByEmail)
todoroute.get('/getalltodo', getAll)
todoroute.put('/updatetodo/:id', findAndUpdate)
todoroute.delete('/deletetodo/:id', deleteTodo)
todoroute.get("/todos/summary/:owner_id", getTodoSummaryByUser);

module.exports = todoroute