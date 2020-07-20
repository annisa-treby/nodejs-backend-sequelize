const logEvent = require("../../event/myEmitters");
const {ERROR} = require("../../constant/error-event.constant");
const Product = require("../models/product.model");
const multer = require("multer");

class ProductService {
    async getAllProduct(){
        let result;
        try{
            result = await Product.findAll();
        }catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET ALL PRODUCT FAILED',
                logMessage:e
            })
        }
        return result;
    }

    async getProductById(id){
        let result;
        try {
            result = await Product.findByPk(id)
        }catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET ALL PRODUCT FAILED',
                logMessage:e
            })
        }
        return result;
    }

    async getProductByName(name){
        let result;
        try{
            result = await Product.findOne({
                where : {
                    name : {
                        [Op.like] : `%${name}%`
                    }
                }
            })
        }catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET ALL PRODUCT FAILED',
                logMessage:e
            })
        }
        return result
    }

    async saveProduct(product){
        const newProduct = {
            name:product.name,
            code:product.code,
            description:product.description,
            categoryId:product.categoryId
        }
        let result;
        try {
            result = await Product.create(newProduct)
        }catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET ALL PRODUCT FAILED',
                logMessage:e
            })
        }
        return result;
    }

    async updateProduct(product){
        let result;
        try{
            result = await Product.update(product,{
                where:{
                    id:product.id
                }
            })
        }catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET ALL PRODUCT FAILED',
                logMessage:e
            })
        }
        return result;
    }

    async deleteProduct(id){
        let result;
        try{
            await Product.destroy({
                where:{
                    id:id
                }
            }).then((number)=>{
                result = number
            })
        }catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET ALL PRODUCT FAILED',
                logMessage:e
            })
        }
        return result;
    }
}

module.exports = ProductService