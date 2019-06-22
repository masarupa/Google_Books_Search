const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const API_PORT = 3009;
const app = express();
app.use(cors());

// this is our MongoDB database - haragadon!
const dbRoute = "mongodb+srv://shiina:party123@cluster0-x7hmj.mongodb.net/google_book_app?retryWrites=true&w=majority";

mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


const BookSchema = new mongoose.Schema(
  {
    title: String,
    authors: [String],
    description: String,
    image: String,
    link: String
  }
);
var Books = mongoose.model('book', BookSchema)


// /api/books (get) - Should return all saved books as JSON.
app.get('/api/books', (req, res) => {

	Books.find({}, null, function(err, books){
		if(err){
			console.log('error getting book list')
        	res.header("Content-Type",'application/json');
  			res.send(JSON.stringify({'msg':'error'}))
        } else{
        	console.log('sending list')
            res.send(books);
        }
	})
});



// /api/books (post) - Will be used to save a new book to the database.
app.post('/api/books', (req, res) => {

	console.log('book params', req.body)

	Books.create(req.body, function(err, book){
  		if (err){
  			console.log(err)
  			res.header("Content-Type",'application/json');
  			res.send(JSON.stringify({'msg':'error'}))
  		} else {
  			console.log('book successfully added')
  			res.header("Content-Type",'application/json');
  			res.send(JSON.stringify({'msg':'success'}))
  		}
	});
});

// /api/books/:id (delete) - Will be used to delete a book from the database by Mongo _id.
app.delete('/api/books/:id', (req, res) => {
	Books.findByIdAndDelete(req.params.id, function (err) {
		if (err){
			console.log('error in deleing book')
			res.header("Content-Type",'application/json');
  			res.send(JSON.stringify({'msg':'error'}))
		} else {
			console.log('book successfully deleted')
			res.header("Content-Type",'application/json');
  			res.send(JSON.stringify({'msg':'success'}))
		}
	});
});



app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));