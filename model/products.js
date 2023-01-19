const mongoose = require("mongoose");

const productsSchema = new mongoose.Schema({
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
offer: {
    type: "array",
    "items": {
        "type": "number"
    }
},

    },{ collection: 'products' }
 )

const products = mongoose.model('productsSchema', productsSchema);
module.exports = products;
