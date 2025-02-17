// Import required modules
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import Comment from './models/Comment.js'; // Fixed import with file extension

// Initialize Express app
const app = express();
const port = 5080;

// Middleware to handle incoming request data
app.use(bodyParser.json()); // Parses JSON data from requests
app.use(bodyParser.urlencoded({ extended: true })); // Parses form data (x-www-form-urlencoded)
app.use(express.static('public'));

// Connect to MongoDB FIRST before defining routes
mongoose.connect(
  'mongodb+srv://christianfryksten1:AuJWg2Cc1POX9RME@commentcluster.pdmgt.mongodb.net/?retryWrites=true&w=majority&appName=commentCluster'
);

// Connection event listeners
const db = mongoose.connection;

db.on('error', (error) => console.error('MongoDB connection error:', error)); // Improved error logging
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
});

// Define routes AFTER the database is connected
app.get('/', (req, res) => {
  res.send('Hello, MongoDB is connected!');
});

// POST route to add a comment
app.post('/add-comment', async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) {
      return res.status(400).json({ error: 'Text is required' });
    }

    const newComment = await Comment.create({ text });
    res.json({ message: 'Comment added successfully!', comment: newComment });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Something went wrong!', details: error.message });
  }
});

app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ timestamp: -1 });
    res.json(comments);
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Something went wrong!', details: error.message });
  }
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
