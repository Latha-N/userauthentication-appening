const express = require('express')
const router = express.Router()
//const bcryptjs = require('bcryptjs')
const  { User } = require('../models/User')

//localhost:3000/users/register
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

//localhost:3000/users/login
router.post('/login', function(req,res){
    const body=req.body
    User.findByCredential(body.email, body.password)
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})


// router.post('/login', function(req,res){
//     const body = req.body
//     User.findOne({ email: body.email})
//         .then(function(user){
//             //console.log(user)
//             if(!user){
//                 res.status('404').send('invalid email / password')
//             }
//             bcryptjs.compare(body.password, user.password)
//             .then(function(result){
//                 if(result){
//                     res.send(user)
//                 }else{
//                     res.status('404'.send('invalid password / password'))
//                 }
//             })

//         })
//         .catch(function(err){
//             res.send(err)
//         })
// })


//localhost:3000/users/logout

module.exports = {
    usersRouter: router
}