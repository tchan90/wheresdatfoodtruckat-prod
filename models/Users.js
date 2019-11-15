//Users model
const bcrypt = require('bcryptjs')

async function hashPassword(user){
    if(!user.changed('password')){
        return;
    }
    //generate random password
    const salt = await bcrypt.genSalt(10)
    const hashPasswordValue = await bcrypt.hash(user.password, salt)
    user.setDataValue('password', hashPasswordValue)
}

module.exports = (sequelize, DataTypes) => {
const User = sequelize.define('User', 
{
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING
    },
  },
    { 
    hooks:{
        beforeSave: hashPassword
    },
}    
    )
//validate password 
User.prototype.comparePassword = async function(password){
    try{
        const validPassword = await bcrypt.compare(password, this.password)
        return validPassword;
    }catch (error){
        console.log("Wrong Password" + error)
    }
}
return User
}