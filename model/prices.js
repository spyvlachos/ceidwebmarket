const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
id: {
    type: String
},
name: {
    type: String
},
prices: {
    date: {
        type: String
    },
    price: {
        type: String
    }
},

    },{ collection: 'market' }
 )

const prices = mongoose.model('StoreSchema', StoreSchema);
module.exports = prices;
