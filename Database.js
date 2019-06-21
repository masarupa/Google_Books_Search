const mongoose = require('mongoose');
const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');

const API_PORT = 3009;
const app = express();
app.use(cors());
const router = express.Router();

// this is our MongoDB database
const dbRoute =
"mongodb+srv://kim:123123co!@cluster0-t5kc6.mongodb.net/test?retryWrites=true&w=majority"

// connects our back end code with the database
mongoose.connect(dbRoute, { useNewUrlParser: true });

let db = mongoose.connection;

// db.once('open', () => console.log('connected to the database'));

// // checks if connection with the database is successful
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));


// // this is our get method
// // this method fetches all available data in our database
app.get('/api/books', (req, res) => {
  res.send('sdsd')
});

// // this is our update method
// // this method overwrites existing data in our database
// router.post('/api/books', (req, res) => {
  
// });

// // this is our delete method
// // this method removes existing data in our database
// router.delete('/api/books', (req, res) => {

// });


// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));
