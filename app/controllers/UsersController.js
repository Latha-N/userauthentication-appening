const express = require('express')
const router = express.Router()
//const bcryptjs = require('bcryptjs')
const  { User } = require('../models/User')
const { authenticateUser } = require('../middlewares/authentication')

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
        return user.generateToken()
    })
        .then(function(token){
            res.setHeader('x-auth', token).send({})
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/users/account-private
router.get('/account', authenticateUser, function(req,res){
    const { user } = req
    res.send(user)
    
})


//localhost:3000/users/logout
router.delete('/logout',authenticateUser, function(req,res){
    const { user, token} = req
    User.findByIdAndUpdate(user._id,{ $pull : {tokens: {token: token}}})
        .then(function(){
            res.send({notiece: 'successfully logged out'})
        })
        .catch(function(err){
            res.send(err)
        })
})

//localhost:3000/users/update
router.put('/update/:id', authenticateUser, function(req,res){
    const { user, token } = req
    const body = req.body
    //const id = req.params.id
    User.findOneAndUpdate(user._id,body,{new:true,runValidator:true})
    .then(function(){
        if(user){
            res.send(user)

        }else{
            res.send({})
        }
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



module.exports = {
    usersRouter: router
}