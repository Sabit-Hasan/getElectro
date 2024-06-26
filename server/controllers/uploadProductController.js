const Product = require("../models/productModel");

const uploadProduct = async (req, res) => { 
    try {
        const { productName, brandName, category, productImage, description, price, sells } = req.body;
        
        const uploadedProduct = await Product.create({ productName, brandName, category, productImage, description, price, sells });

        res.status(200).json({
            uploadedProduct,
            success: true,
            error: false,
            message: 'Product uploaded successfully!'
        })

    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
}

module.exports = uploadProduct;