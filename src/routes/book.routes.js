const { Router } = require("express");
const { createBook, getbookbyid, getAllBook,deleteBook, getbookbyName } = require("../controller/book.controller");
const { validate, bookValidation } = require('../utils/validateRequest')

const bookroute = Router()
bookroute.post('/createbook',validate(bookValidation), createBook)
bookroute.get('/getallbook', getAllBook)
bookroute.get('/getbookbyid/:id', getbookbyid)
bookroute.get('/getbookbyName', getbookbyName)
bookroute.delete('/deletebookbyid/:id', deleteBook)

module.exports = bookroute