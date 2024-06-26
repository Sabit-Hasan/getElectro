const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    productName: String,
    brandName: String,
    category: String,
    productImage: [],
    description: String,
    price: Number,
    sells: Number
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema); 

module.exports = Product;