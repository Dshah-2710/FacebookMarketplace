const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  condition: [String], // Array of conditions
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: {
    type: String, // To store the path of the uploaded image
    required: true
  }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
