const Product = require("../models/productModel");

const getCategory = async (req, res) => {
    try {
        const productCategories = await Product.distinct("category");

        // store single product form each category
        const productByCategory = [];

        for (const category of productCategories) {
            const product = await Product.findOne({ category });

            if (product) {
                productByCategory.push(product);
            }
        }

        res.json({
            message: "Getting Category Successfully!",
            data: productByCategory,
            error: false,
            success: true
        })
        
    } catch (err) {
        res.status(400).json({
            message: err.message,
            error: true,
            success: false
        });
    }
};

module.exports = getCategory;