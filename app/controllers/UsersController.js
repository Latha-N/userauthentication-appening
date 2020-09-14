const express = require('express')
const router = express.Router()
const  { User } = require('../models/User')

//localhost:3099/users/register
router.post('/register', function(req,res){
    const body=req.body
    //console.log(body)
    const user = new User(body)
    user.save()
        .then(function(user){
            console.log(user)
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3099/users/login


//localhost:3099/users/logout

module.exports = {
    usersRouter: router
}