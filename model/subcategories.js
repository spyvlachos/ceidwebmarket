const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
id: {
    type: String
},
name: {
    type: String
},
subcategories: {
    name: {
        type: String
    },
    uuid: {
        type: String
    }
},

    },{ collection: 'market' }
 )

const subcategories = mongoose.model('StoreSchema', StoreSchema);
module.exports = subcategories;
