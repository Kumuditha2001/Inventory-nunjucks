const express = require("express");
const router = express.Router();
const Item = require("../models/item");

// Show all items
router.get("/", async (req, res) => {
    const items = await Item.find();
    res.render("index.njk", { items });
});

// Add page
router.get("/add", (req, res) => {
    res.render("add.njk");
});

// Add item
router.post("/add", async (req, res) => {
    const item = new Item(req.body);
    await item.save();
    res.redirect("/");
});

// Edit page
router.get("/edit/:id", async (req, res) => {
    const item = await Item.findById(req.params.id);
    res.render("edit.njk", { item });
});

// Update item
router.post("/update/:id", async (req, res) => {
    await Item.findByIdAndUpdate(req.params.id, req.body);
    res.redirect("/");
});

// Delete item
router.get("/delete/:id", async (req, res) => {
    await Item.findByIdAndDelete(req.params.id);
    res.redirect("/");
});

module.exports = router;