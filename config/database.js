
const mongoose=require('mongoose')

const setupDB=()=>{
mongoose.connect('mongodb://localhost:27017/user-appening',{ useNewUrlParser: true ,useUnifiedTopology: true } )
    .then(()=>{
        console.log('connect to db')
    })
    .catch((err)=>{
        console.log('error',err)
    })
}

module.exports=setupDB

