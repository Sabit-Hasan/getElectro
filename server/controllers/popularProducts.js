const Product = require('../models/productModel');

const popularProducts = async(req, res) => {
    try {
        const products = await Product.find();

        products.sort(() => Math.random() - 0.5);

        const popularProducts = (products.slice(0, 5));

        res.json({
            data: popularProducts,
            message: "Popular Products Found Successfully!!",
            success: true,
            error: false
        })

    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

module.exports = popularProducts;