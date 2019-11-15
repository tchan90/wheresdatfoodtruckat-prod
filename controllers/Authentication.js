//Authentication (Reg and Login) endpoint methods
//User Routes (Reg and Login)
const {User} = require('../models');
const jwt = require('jsonwebtoken');
const config = require('../config/config')

//Webtoken
function jwtSignUser(user){
    const tokenExpiryTime = 60*60*24*7;
    return jwt.sign(user, config.authentication.jwtSecret, {expiresIn: tokenExpiryTime})
}

module.exports= {

//POST register
 //once user registers successfully will send user the token
async register(req,res){
    try {
        const user = await User.create(req.body)
        const userJSON = user.toJSON();
        const token = jwtSignUser(userJSON);
        //send token to header
        res.header("x-auth-token", token).send({
            user: userJSON,
            token: jwtSignUser(userJSON)
        })
    } catch (error) {
        res.status(400).send({
            error: 'This email is already in use'
        })
    }
},
//POST login
async login (req,res){
    try {
        const {email, password} = req.body
        const user = await User.findOne({
            where:{
                email: email
            }
        })
        //if login incorrect
        if(!user){
            res.status(401).send({
                error: 'The login information was incorrect'
            })
        }
        const isPasswordValid = await user.comparePassword(password)
        if (!isPasswordValid){
            res.status(401).send({
                error: 'The password was incorrect'
            })
        }
        //if login correct
        const userJSON = user.toJSON();
        const token = jwtSignUser(userJSON);
        //send token to header
        res.header("x-auth-token", token).send({
            user: userJSON,
            token: jwtSignUser(userJSON)
        })
    }catch(err){
        res.status(500).send({
            error: 'An error occured'
        })
    }
},
}
