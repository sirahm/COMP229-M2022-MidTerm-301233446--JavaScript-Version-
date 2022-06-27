// modules required for routing
let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
module.exports = router;



// define the book model
let Book = require('../models/books');

/* GET books List page. READ */
router.get('/', (req, res, next) => {
  // find all books in the books collection
  Book.find( (err, books) => {
    if (err) {
      return console.error(err);
    }
    else {
      res.render('books/index', {
        title: 'Books',
        books: books
      });
    }
  });
});


//  GET the Book Details page in order to add a new Book
router.get('/add', (req, res, next) => {

  res.render('books/add', {title: 'Add Book'})   

});

// POST process the Book Details page and create a new Book - CREATE
router.post('/add', (req, res, next) => {
 
  let newBook = Book({
    "Title": req.body.Title,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre,
    "Description": req.body.Description
  });



  Book.create(newBook, (err, Book) =>{
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });
});

//GET route for displaying the edit page
router.get('/edit/:id', (req, res, next) => {
let id = req.params.id;

    Book.findById(id, (err, bookToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('books/edit', {title: 'Edit Book', book: bookToEdit})
        }
    });
  });  

// POST the Book Details page in order to edit an existing Book
router.post('/edit/:id', (req, res, next) => {
  let id = req.params.id

  let updatedBook = Book({
    "_id": id,
    "Title": req.body.Title,
    "Price": req.body.Price,
    "Author": req.body.Author,
    "Genre": req.body.Genre,
    "Description": req.body.Description
    
  });

  Book.updateOne({_id: id}, updatedBook, (err) => {
      if(err)
      {
          console.log(err);
          res.end(err);
      }
      else
      {
          // refresh the book list
          res.redirect('/books');
      }
  });
});


// GET - process the delete by user id
router.get('/delete/:id', (req, res, next) => {
  let id = req.params.id;

    Book.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
             // refresh the list
             res.redirect('/books');
        }
    }); 

});