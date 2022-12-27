const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
id: {
    type: String
},
name: {
    type: String
},
address: {
    type: String
},
types: {
    type: [
        String
    ]
},
coordinates: {

    lat: {
       type: Number
    },
    lng: {
        type: Number
    }
},
rating: {
    type: Number
},
rating_n: {
    type: Number
},
populartimes: {
    name: {
        type: String
    },
    data: {
        type: Array
    }

},
covidcases: {
   type: Number,
    default: '0'
}

    },{ collection: 'stores' }
 )


const Stores = mongoose.model('StoreSchema', StoreSchema);
module.exports = Stores;


