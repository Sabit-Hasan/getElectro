const express = require('express');
const { userRegister, userLogin } = require('../controllers/authController');
const authToken = require('../middleware/authToken');
const userDetails = require('../controllers/userDetailsController');
const updateUser = require('../controllers/updateUser');
const deleteUser = require('../controllers/deleteUser');
const uploadProduct = require('../controllers/uploadProductController');
const getProducts = require('../controllers/getProductsController');
const updateProductController = require('../controllers/updateProductController');
const getCategory = require('../controllers/getCategoryController');
const popularProducts = require('../controllers/popularProducts');

const router = express.Router();

router.post('/register', userRegister);
router.post('/login', userLogin);

// Admin Panel
router.get('/users-details', authToken, userDetails);
router.put('/user-update/:id', authToken, updateUser);
router.delete('/user-delete/:id', authToken, deleteUser);

// product 
router.post('/upload-product', uploadProduct);
router.get('/get-products', getProducts);
router.post('/update-product', updateProductController);
router.get('/get-category', getCategory);
router.get('/popular-products', popularProducts);

module.exports = router;