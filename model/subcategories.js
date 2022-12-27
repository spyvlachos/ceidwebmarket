const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
id: {
    type: String
},
name: {
    type: String
},
populartimes: {
    name: {
        type: String
    },
    uuid: {
        type: String
    }
},

    },{ collection: 'stores' }
 )


const Stores = mongoose.model('StoreSchema', StoreSchema);
module.exports = Stores;