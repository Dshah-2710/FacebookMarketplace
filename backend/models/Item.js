const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    title: String,
    price: String,
    description: String,
    image: String
});

const Item = mongoose.model("Item", itemSchema);

module.exports = Item;
