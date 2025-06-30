const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('client'));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/my-ecommerce', { useNewUrlParser: true, useUnifiedTopology: true });

// Product Model
const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    imageUrl: String
});

const Product = mongoose.model('Product', productSchema);

// Routes
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).send('Error fetching products');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
