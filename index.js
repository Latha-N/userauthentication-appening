const express = require('express')
//const { mangoose } = require()

const setupDB = require('./config/database')

const {usersRouter} = require('./app/controllers/UsersController')
const app = express()
const port = 3000
setupDB()

app.use(express.json())//handling incoming data
app.use('/users', usersRouter)

app.listen(port, function(){
    console.log('listening on port', port)
})