require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");

const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mern-task")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.use("/api/auth", authRoutes);
app.use("/products", productRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});