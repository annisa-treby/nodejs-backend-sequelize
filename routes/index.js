const express = require('express');
const router = express.Router();

const categoryRoutes = require('./category.route');
const productRoutes = require('./product.route')
const authRoutes = require('./auth.route')
const noRoute = require('./no.route');
const logRoute = require('./log.route');

router.use(logRoute);
router.use('/auth', authRoutes)
router.use('/category', categoryRoutes);
router.use('/product', productRoutes)
router.use(noRoute);

module.exports = router;
