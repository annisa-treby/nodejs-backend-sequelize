const connection = require("../../dbConn")
const logEvent = require("../../event/myEmitters")
const {ERROR} = require('../../constant/error-event.constant')
const Category = require('../models/category.model')
const Product = require('../models/product.model')

class CategoryService {

    async getAllCategories() {
        let result;
        try {
            result = await Category.findAll({
                include:Product
            });
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET ALL CATEGORY FAILED',
                logMessage: e
            })
        }
        return result;
    }

    async getCategoryInPage(page, row){
        let result;
        try {
            result = await Category.findAndCountAll({offset:Number(page), limit:Number(row), include:Product})
        }catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET CATEGORY SERVICE FAILED',
                logMessage:e
            })
            throw new Error(e)
        }
        return result
    }

    async getCategoryById(id) {
        let result;
        try {
            result = await Category.findByPk(id,
                {
                    include:Product
                })
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET CATEGORY BY ID FAILED',
                logMessage: e
            })        }
        return result;
    }

    async getCategoryByName(name){

        let result;
        try {
            result = await Category.findOne({
                where : {
                    name: {
                        [Op.like] : `%${name}%`
                    }
                }
            });
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'GET CATEGORY BY NAME FAILED',
                logMessage: e
            })        }
        return result;
    }

    async saveCategory(category){
        let result;
        try {
            result = await Category.create(category);
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'POST CATEGORY FAILED',
                logMessage: e
            })
        }
        return result;
    }

    async updateCategory(category){
        let result;
        try {
            result = await Category.update(category,{
                where:{
                    id:category.id
                }
            })
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'UPDATE CATEGORY FAILED',
                logMessage: e
            })
        }
        return result;
    }

    async deleteCategory(id){
        let result;
        try {
            await Category.destroy({
                where:{
                    id:id
                }
            }).then((num) => {
                result = num
                }
            )
        } catch (e) {
            logEvent.emit(ERROR, {
                logTitle:'DELETE CATEGORY FAILED',
                logMessage: e
            })
        }
        return result;
    }
}

module.exports = CategoryService;