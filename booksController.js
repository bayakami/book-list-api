const express = require ('express')
const createError = require('http-errors')
const { ObjectId } = require('mongodb');
const mongoose = require('mongoose');
const {v4: uuidv4} = require('uuid');
const {Book} = require ('./book.js');

mongoose.connect('mongodb+srv://dbUser:Password@cluster0.m7oea.mongodb.net/todolist?retryWrites=true&w=majority')
const app = express();

exports.index = async function (req, res) {
    res.send(await Book.find())
}

exports.create = function(req, res, next) {
    if(!req.body.title){
        return(next(createError(400, "title is required")))
    } else if (!req.body.author) {
        return(next(createError(400, "author is required")))
    } else if (!req.body.read) {
        return(next(createError(400, "read: yes/no is required")))
    } else if (req.body.read != "yes" && req.body.read != "no" ) {
        return(next(createError(400, "yes or no is required"))) 
    }
    const b = new Book(req.body);
    b.save();
    res.send({result: true})
}

exports.show = async function(req, res, next) {
    const bookitem = await Book.findOne({
        _id:req.params.id
    })
    if(!bookitem) {
        return(next(createError(404, "no book with that id")))
    }
    res.send(bookitem)
}

//authorisation for deleting an item
app.delete('/auth', async (req,res) => {
    const user = await User.findOne({ username: req.body.username })
    console.log(req.body)
    if(!user) {
      return res.sendStatus(401);
    }
    if( req.body.password !== user.password ){
      return res.sendStatus(403)
    }
  
    user.token = uuidv4()
    await user.save()
    res.send({token: user.token})
  }) 

  app.use( async (req,res,next) => {
    const authHeader = req.headers['authorization']
    const user = await User.findOne({token: authHeader})
    if(user) {
      next()
    }else {
      res.sendStatus(403);
    }
  })

exports.delete = async function(req, res, next) {
    await Book.findOneAndDelete({_id:req.params.id})
    res.send({result:true})
}


exports.update = async function(req, res, next) {

    await Book.findOneAndUpdate({_id:ObjectId(req.params.id)}, req.body);
    res.send({result:true})
}


var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {
  console.log("Database connected!")
});


