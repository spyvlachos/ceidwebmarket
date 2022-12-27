const mongoose = require("mongoose");

const StoreSchema = new mongoose.Schema({
type: {
    type: Object
}    
id: {
    type: String
},
lat: {
     type: Number
},
lon: {
     type: Number
    }                                      
name: {
    type: String
},
tags: {
    shop :{
       type: String
    },
    name :{
    type: String
    },
        
    data: {
        type: Array
    }
    
},

    },{ collection: 'stores' }
 )


const Stores = mongoose.model('StoreSchema', StoreSchema);
module.exports = Stores;


