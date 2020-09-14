const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const userSchema = new Schema({
        username:{
            type:String,
            required:true,
            unique:true,
            minlength:5
        },
        email:{
            type:String,
            required:true,
            unique:true,
            validate: {
                validator: function(value){
                    return validator.isEmail(value)
                },
                message: function(){
                    return 'invalid email format'
                }
            }
        },
        password:{
            type:String,
            required:true,
            minlength:6,
            maxlength:128
        }
})

//pre hooks-mongoose midleware
userSchema.pre('save',function(next){
    const user = this //this will refer to user object before saving to the database
    bcryptjs.genSalt(10)
    .then(function(salt){
        bcryptjs.hash(user.password, salt)
        .then(function(encryptedPassword){
            user.password= encryptedPassword
            next()
        })
    })

})


const User = mongoose.model('User', userSchema)

module.exports = {
    User
}