const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
    name: String,
    price: Number,
    stock: Number,
    category: String
    // CI/CD Test
});

module.exports = mongoose.model("item", itemSchema);