const sequelize = require('sequelize');
const connection = require('../../dbConn')

const Product = connection.define('product', {
    id : {
        type: sequelize.UUID,
        defaultValue: sequelize.UUIDV1,
        allowNull: false,
        primaryKey:true,
    },
    image : {
      type: sequelize.STRING
    },
    code : {
      type: sequelize.STRING
    },
    name:{
        type: sequelize.STRING,
    },
    description:{
        type: sequelize.STRING
    }
}, {
        freezeTableName: true,
        tableName: 'product',
        paranoid:true
    }
)
module.exports = Product;