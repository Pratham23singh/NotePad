const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/NotePad";

//connecting mongodb to node.js
mongoose.set('strictQuery', true);
const connectToMongo = function() {
    mongoose.connect(mongoURL, ()=>{
        console.log("connected successfully")
    })
}


module.exports = connectToMongo;