// Load environment variables FIRST
require("dotenv").config();

const express = require("express");
const nunjucks = require("nunjucks");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();

/* -------------------- MIDDLEWARE -------------------- */
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

/* -------------------- NUNJUCKS SETUP -------------------- */
nunjucks.configure("views", {
    autoescape: true,
    express: app
});

/* -------------------- DEBUG (IMPORTANT) -------------------- */
// Remove this later after fixing
console.log("MONGO_URI =", process.env.MONGO_URI);

/* -------------------- MONGODB CONNECTION -------------------- */
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB Connection Error:", err.message);
});

/* -------------------- ROUTES -------------------- */
const itemRoutes = require("./routes/itemRoutes");
app.use("/", itemRoutes);

/* -------------------- SERVER START -------------------- */
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on http://localhost:" + PORT);
});