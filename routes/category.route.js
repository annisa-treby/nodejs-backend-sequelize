const express = require('express');
const router = express.Router();
const CategoryService = require('../src/services/category.service');
const {getCategoryList,addCategory, updateNewCategory,deletingCategory} = require ("../src/controllers/category.controller");
const tokenValidation = require('../src/middlewares/token-validation')
const categoryService = new CategoryService();

router.use(tokenValidation)
router.get('/', (req, res, next)=> getCategoryList(req, res, categoryService));
router.post('/', (req, res, next) => addCategory(req, res, categoryService));
router.put('/', (req, res, next) => updateNewCategory(req, res, categoryService));
router.delete('/:id', (req, res, next) => deletingCategory(req, res, categoryService));
module.exports = router;