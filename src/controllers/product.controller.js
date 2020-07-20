const multer = require("multer");
const fs = require("fs")

const getAllProduct = async (req, res, service) => {
    try{
        let products;

        if(req.query.id){
            const id = req.query.id;
            products = await service.getProductById(id);
        } else if (req.query.name){
            const name = req.query.name;
            products = await service.getProductByName(name);
        } else {
            products = await service.getAllProduct();
        }
        res.send(products);
    }catch (e) {
        res.sendStatus(500)
    }
};

const addProduct = async (req, res, service) => {

    if (!req.body.name || !req.body.code || !req.body.categoryId){
        res.send({
            message:"there is empty field"
        })
    }else {
        const body = req.body;
        const product = await service.saveProduct(body);
        res.send(product);
    }
}

const updateProduct = async (req, res, service) => {
    const body = req.body;
    const product = await service.updateProduct(body);
    res.send(product);
}

const deleteProduct = async (req, res, service) => {
    const id = req.params.id;
    await service.deleteProduct(id).then((response)=>{
        if (response == 1){
            res.send({
                message:"product was deleted"
            })
        } else {
            res.send({
                message:"id not found"
            })
        }
    }).catch(()=>{
        res.status(500).send({
            message:"delete failed"
        })
    })
}

module.exports = {getAllProduct, addProduct, updateProduct, deleteProduct}