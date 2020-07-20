const getCategoryList = async (req, res, service) =>{
    try{
        let categories;

        if (req.query.id){
            const id = req.query.id;
            categories = await service.getCategoryById(id);
        }else if (req.query.name){
            const name = req.query.name;
            categories = await service.getCategoryByName(name);
        } else if(req.query.page && req.query.row) {
            categories = await service.getCategoryInPage(req.query.page, req.query.row)
        }else {
                categories = await service.getAllCategories();
            }

        res.send(categories);
    }catch (e) {
        res.status(500).send({
            message:"cannot get category"
        })
    }

};

const addCategory = async (req, res, service) => {
    if(!req.body.name){
        res.status(400).send({
            message:"Name cannot be empty"
        })
    } else {
        const body = req.body;
        const newData = await service.saveCategory(body);
        res.send(newData);
    }
}

const updateNewCategory = async (req, res, service) => {
    if (!req.body.id || !req.body.name){
        res.status(400).send({
            message:"id, name, code, and description cannot be empty"
        })
    } else {
        const body = req.body;
        await service.updateCategory(body).then((number)=>{
            if (number == 1){
                res.send({
                    message:"category was updated",
                    data:body
                })
            } else {
                res.send({
                    message:"id category not found"
                })
            }

        })
    }
}

const deletingCategory = async (req, res, service) => {
    const id = req.params.id;
    await service.deleteCategory(id).then((number)=>{
        if (number == 1){
            res.send({
                message:"category was deleted"
            })
        } else {
            res.send({
                message:"id category not found"
            })
        }
    }).catch(()=>{
        res.status(500).send({
            message:"delete failed"
        })
    });
}

module.exports = {getCategoryList, addCategory, updateNewCategory, deletingCategory}