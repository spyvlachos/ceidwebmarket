const mongoose = require("mongoose");
const MongoClient = require("mongodb").MongoClient;
const dbname = 'market';
const connectDB = async () => {
    try {
        const con = await mongoose.connect("mongodb://localhost:27017/market", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        
        })
        console.log('MongoDb connected');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
    
}

module.exports = connectDB

