const Product = require('./product.model')
const Category = require('./category.model')

const dbAssociation = function dbAssociation() {
    Category.hasMany(Product);
    Product.belongsTo(Category);
};

module.exports = dbAssociation;