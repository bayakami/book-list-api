const createError = require('http-errors')

let booklist = []
let idno = 0
//let read = true

exports.index = function (req, res) {
    res.send(booklist)
}

exports.create = function(req, res, next) {
    if(!req.body.title){
        return(next(createError(400, "title is required")))
    } else if (!req.body.author) {
        return(next(createError(400, "author is required")))
    } else if (!req.body.read) {
        return(next(createError(400, "read: yes/no is required")))
    } else if (req.body.read != "yes" && req.body.read != "no" ) {
        return(next(createError(400, "read can only be yes or no"))) 
    }
    booklist.push({id: idno, title:req.body.title, author:req.body.author, read:req.body.read})
    res.send({result: true})
    idno++
}

exports.show = function(req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if(!bookitem) {
        return(next(createError(404, "no book with that id")))
    }
    res.send(bookitem)
}

exports.delete = function(req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if(!bookitem) {
        return(next(createError(404, "no book with that id")))
    }
    booklist = booklist.filter((book) => book.id != req.params.id)
    res.send({result:true})
}

exports.update = function(req, res, next) {
    const bookitem = booklist.find((book) => book.id == req.params.id)
    if(!req.body.title){
        return(next(createError(400, "title is required")))
    } else if (!req.body.author) {
        return(next(createError(400, "author is required")))
    } else if (!req.body.read) {
        return(next(createError(400, "read: yes/no is required")))
    } else if (req.body.read != "yes" && req.body.read != "no" ) {
        return(next(createError(400, "read can only be yes or no"))) 
    }
    booklist = booklist.map((book) => {
        if (book.id == req.params.id) {
            book.title = req.body.title
        }
        return book
    })
    booklist = booklist.map((book) => {
        if (book.id == req.params.id) {
            book.author = req.body.author
        }
        return book
    })
    res.send({result: true})
}


