const Item = require("../models/Item");

// Home Page (Render EJS)
const homePage = (req, res) => {
    res.render("home"); // Render EJS view
};


// Get Marketplace Items (Fetch from MongoDB)
const getMarketplace = async (req, res) => {
    try {
        const items = await Item.find(); // Fetch items from the database
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
};

// Add New Item to Marketplace
const addItem = async (req, res) => {
    try {
        const { title, price, description, image } = req.body;
        const newItem = new Item({ title, price, description, image });

        await newItem.save();
        res.status(201).json({ message: "Item Added Successfully!" });
    } catch (error) {
        res.status(500).json({ message: "Failed to add item" });
    }
};

module.exports = { homePage, getMarketplace, addItem };
