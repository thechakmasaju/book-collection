const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware
app.use(bodyParser.json());

// Store the books in an array
let books = [];

// Serve static files
app.use(express.static('public'));

// Route to serve index.html
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// Route to get the list of books
app.get('/books', (req, res) => {
  res.json(books);
});

// Route to add a book to the collection
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;
  const id = generateUniqueId();

  const book = {
    id,
    title,
    author,
    publishedDate
  };

  books.push(book);

  res.json(book);
});

// Route to delete a book from the collection
app.delete('/books/:id', (req, res) => {
  const { id } = req.params;

  const index = books.findIndex(book => book.id === id);
  if (index !== -1) {
    books.splice(index, 1);
    res.json({ message: 'Book successfully deleted.' });
  } else {
    res.status(404).json({ message: 'Book not found.' });
  }
});

// Helper function to generate a unique ID
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
