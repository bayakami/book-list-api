const mongoose = require('mongoose')

const bookSchema = mongoose.Schema({
    title: String,
    author: String,
    read: String,

})

module.exports.Book = mongoose.model('book',bookSchema,'book')