//Validation with Joi
const Joi = require('@hapi/joi')

module.exports = {
    //middleware
    register(req,res,next){
        //Joi schema
        const schema = {
            email: Joi.string().email(),
            password: Joi.string().regex(
                new RegExp('^[a-zA-Z0-9]{8,32}$')
            )
        }
        const{error, value} = Joi.validate(req.body, schema)
        //Error checking
        if(error){
            switch(error.details[0].context.key){
                case 'email':
                    res.status(400).send({
                        error: 'You must provide a valid email address'
                    })
                    break
                case 'password':
                    res.status(400).send({
                        error: `${error} <br> The password failed to match the requirements:
                        <br>
                        1. It must contain ONLY the following characters: lowercase, uppercase, numbers
                        <br>
                        2. Must be between 8 and 32 characters`
                    })
                    break
                default:
                res.status(400).send({
                    error: 'Invalid registration information'
                })
            }
        }else{
            next()
        }
    }
}
