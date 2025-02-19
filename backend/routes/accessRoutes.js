const express = require("express");
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Product = require('../models/Product'); 

const { homePage, getMarketplace, addItem } = require("../controllers/homePageController");
const { loginPage, registerPage,registerUser, loginUser, logoutUser } = require("../controllers/loginController");
const { authMiddleware } = require("../middleware/loginMiddleware");  
const productController = require("../controllers/productController");



// Debugging: Log imported functions to check if they are undefined
console.log("homePage:", homePage ? "✅ Loaded" : "❌ Undefined");
console.log("getMarketplace:", getMarketplace ? "✅ Loaded" : "❌ Undefined");
console.log("addItem:", addItem ? "✅ Loaded" : "❌ Undefined");
console.log("login:", loginUser ? "✅ Loaded" : "❌ Undefined");
console.log("authMiddleware:", authMiddleware ? "✅ Loaded" : "❌ Undefined");

// Public Routes
router.get("/", homePage); // Render homepage

router.get("/login", loginPage);
router.get("/register", registerPage);
router.post("/register", registerUser);

router.get("/add-products", productController.getAddProduct);
router.post("/add-products", productController.postAddProduct);
// ✅ Handle login and logout
router.post("/login", loginUser);
router.get("/logout", logoutUser);

// Protected Routes (Requires Authentication)
router.get("/marketplace" , getMarketplace); // Protected Marketplace Page
router.post("/marketplace", addItem); // Add item (protected)
router.get('/product-list', authMiddleware, (req, res) => {
    // Pass the logged-in user to the view
    res.render('product-list', { user: req.session.user });
});
router.get('/product-list', (req, res) => {
    console.log("Request received for product-list");
    res.render('product-list', { products: [] }); // Test with empty array
});
router.post("/add-products", productController.postAddProduct);

  

module.exports = router;
