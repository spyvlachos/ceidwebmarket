const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
category: {
    type: String
},
id: {
    type: String
},
name: {
    type: String
}, 
subcategory: {
    type: String
},

    },{ collection: 'products' }
 )

const products = mongoose.model('StoreSchema', StoreSchema);
module.exports = products;
