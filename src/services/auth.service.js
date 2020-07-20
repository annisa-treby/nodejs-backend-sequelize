const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
const SysUser = require('../models/user.model')
const bcrypt = require('bcryptjs')
const logEvent = require('../../event/myEmitters')
const {ERROR} = require('../../constant/error-event.constant')

dotenv.config();

class AuthService {
    async authenticate(user){
        const {userName, userPassword} = user;
        let authUser;
        try {
            authUser = await SysUser.findOne({
                where : {
                    userName : userName
                }
            });
            const matchPassword = bcrypt.compareSync(userPassword, authUser.userPassword)
            console.log(userPassword)
            if (matchPassword){
                const expiresIn = 3000;
                const accessToken = jwt.sign({id:'111'}, process.env.SECRET_KEY,
                    {
                        expiresIn: expiresIn
                    });
                authUser = {
                    user:{
                        userId:authUser.id,
                        userName:authUser.userName,
                        fullName: authUser.fullName,
                        email: authUser.email,
                    }, token : accessToken
                }
            } else {
                authUser = null
            }
        }catch (e) {
            logEvent.emit(ERROR,{
                logTitle:'Authentication failed',
                logMessage: e
            });
            throw new Error(e)
        }
        return authUser
    }
}
module.exports = AuthService

