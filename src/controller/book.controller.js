// const { bookSchema } = require('../utils/validateRequest')
const Book = require('../model/book.model')
const logger = require('../logger/logger')
const createBook = async (req, res) => {
    try {
        // await bookSchema.validateAsync(req.body)
        const bookData = await Book.create(req.body)
        return res.status(201).json(bookData)
    } catch (error) {
        // if (error.isJoi) {
        //     return res.status(400).send({ message: error.details[0].message })
        // }
        logger.error("Error while Creating book data", error)
        return res.status(500).json(error)
    }
}

const getbookbyid = async (req, res) => {
    const { id } = req.params
    try {
        const bookById = await Book.findOne({ created_by: id })
        if (!bookById) {
            return res.status(200).json({ message: "No book found for this user" })
        }
        return res.status(200).json(bookById)
    } catch (error) {
        logger.error("Error while get the book data", error)
        return res.status(500).json(error)
    }
}
const getbookbyName = async (req, res) => {
    const { bookName, id, author } = req.query;

    try {
        // Query object banate hain
        let query = {};

        if (bookName) {
            query.bookName = bookName;
        }

        if (author) {
            query.author = author;
        }

        if (id) {
            query.created_by = id;
        }

        const book = await Book.findOne(query);

        if (!book) {
            return res.status(200).json({ message: "No book found for this query" });
        }

        return res.status(200).json(book);
    } catch (error) {
        logger.error("Error while getting book data", error);
        return res.status(500).json(error);
    }
};


const getAllBook = async (req, res) => {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;

    const offset = (page - 1) * limit 
    try {
        const getallbook = await Book.find({})
            .sort({ createdAt: - 1 })
            .skip(offset)
            .limit(limit)
            .exec();

        res.json({
            getallbook,
            total: await Book.countDocuments(),
        })
        // return res.status(200).json(getallbook)
    } catch (error) {
        logger.error("Error while get all book data", error)
        return res.status(500).json(error)
    }
}

const deleteBook = async (req, res) => {
    const { id } = req.params
    try {
        const deleteData = await Book.findByIdAndUpdate(id, { isActive: false })
        return res.status(200).json(deleteData)
    } catch (error) {
        logger.error(error, 'this is error while delete book data')
        return res.status(500).json(error)
    }
}

module.exports = { createBook, getbookbyid, getAllBook, deleteBook, getbookbyName }