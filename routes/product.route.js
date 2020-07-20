const express = require('express');
const router = express.Router();
const ProductService = require('../src/services/product.service');
const {getAllProduct, deleteProduct, updateProduct, addProduct} = require('../src/controllers/product.controller')

const productService = new ProductService();

router.get('/',(req, res, next) => getAllProduct(req, res, productService));
router.post('/',(req, res, next) => addProduct(req, res, productService));
router.put('/',(req, res, next) => updateProduct(req, res, productService));
router.delete('/:id',(req, res, next) => deleteProduct(req, res, productService));

module.exports = router