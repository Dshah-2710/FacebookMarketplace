const express = require('express');
const db = require('./config/db');
require('dotenv').config();
const path = require('path');
const multer = require('multer'); // Add Multer
const accessRoutes = require('./routes/accessRoutes');

const app = express();

// Set up the app to trust the first proxy (useful if you're behind a proxy like Nginx or similar)
app.set('trust proxy', 1);

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Set the file upload destination
    cb(null, path.join(__dirname, '../frontend/public/assets/images/')); // Set destination folder
  },
  filename: (req, file, cb) => {
    // Set the filename with a unique name (using timestamp to avoid overwriting files)
    cb(null, Date.now() + path.extname(file.originalname)); // Keep the original file extension
  }
});

const upload = multer({ storage: storage });

// Use access routes
app.use('/', accessRoutes);

// Set EJS as the view engine and specify views folder
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../frontend/views')); 
app.use('/images', express.static(path.join(__dirname, '../frontend/public/assets/images/')));
app.use(express.static(path.join(__dirname, '../frontend/public')));

// Example route to handle file upload
app.post('/upload-product-image', upload.single('image'), (req, res) => {
  if (req.file) {
    // If file is uploaded successfully
    res.json({ message: 'Image uploaded successfully!', filePath: `/images/${req.file.filename}` });
  } else {
    // If no file uploaded
    res.status(400).json({ message: 'No file uploaded' });
  }
});

// Server setup
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST || 'http://localhost'; // Default to localhost if no host is set
const serverUrl = `${HOST}:${PORT}`; // Construct full URL dynamically

app.listen(PORT, () => {
    console.log(`Server running at ${serverUrl}`);
});
