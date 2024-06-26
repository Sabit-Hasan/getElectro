const Product = require("../models/productModel");

const getProducts = async (req, res) => {
    try {
        const allProducts = await Product.find().sort({ createdAt: -1 });

        res.json({
            message: "All product get successfully!",
            success: true,
            error: false,
            data: allProducts,
        })
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
};

module.exports = getProducts;