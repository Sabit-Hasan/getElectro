const Product = require("../models/productModel");

const updateProductController = async(req, res) => {
    try {

        // const currentUser = req.user;

        // if (!currentUser || !currentUser.role === "Admin") {
        //     throw new Error("You must be an admin to update Products!")
        // }

        const { _id, ...resBody } = req.body;

        const updateProduct = await Product.findByIdAndUpdate(_id, resBody);

        res.json({
            message: "Product updated successfully!",
            data: updateProduct,
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

module.exports = updateProductController;
