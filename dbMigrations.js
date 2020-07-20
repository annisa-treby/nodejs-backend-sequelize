const connection = require('./dbConn')
const Product = require('./src/models/product.model')
const Category = require('./src/models/category.model')
const dbAssociation = require('./src/models/index')
const SysUser = require('./src/models/user.model')
const bcrypt = require('bcryptjs')

async function migration() {
    dbAssociation();
    await connection.sync({force: true})

    let category1 = await Category.create({name:'food'})

    var passwordHash = bcrypt.hashSync('P@ssw0rd', 8);
    await SysUser.create(
        {
            userName : 'annisa',
            userPassword : passwordHash,
            fullName: "annisa treby m",
            email:"annisa@gmail.com"}
    )
}

migration();