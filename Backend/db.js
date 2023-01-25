const mongoose = require('mongoose');

const mongoURL = "mongodb://localhost:27017/";

const connectToMongo = function() {
    mongoose.connect(mongoURL, ()=>{
        console.log("connected successfully")
    })
}

module.exports = connectToMongo;