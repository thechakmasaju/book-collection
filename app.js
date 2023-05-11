const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

let books = [];

// Serve static HTML file
app.use(express.static(__dirname));

// Get all books
app.get('/books', (req, res) => {
  res.json(books);
});

// Add a new book
app.post('/books', (req, res) => {
  const { title, author, publishedDate } = req.body;

  if (!title || !author) {
    return res.status(400).json({ error: 'Title and author are required' });
  }

  const book = {
    id: generateUniqueId(),
    title,
    author,
    publishedDate
  };

  books.push(book);

  res.json(book);
});

// Delete a book
app.delete('/books/:id', (req, res) => {
  const id = req.params.id;

  const index = books.findIndex(book => book.id === id);

  if (index === -1) {
    return res.status(404).json({ error: 'Book not found' });
  }

  books.splice(index, 1);

  res.json({ message: 'Book deleted successfully' });
});

// Helper function to generate unique IDs
function generateUniqueId() {
  return Math.random().toString(36).substring(2, 15);
}

// Start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});
