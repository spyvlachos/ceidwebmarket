
const mongoose = require("mongoose");

const scoreTokenSchema = new mongoose.Schema({
id: {
    type : String
},   
userId: {
    type: String
},                                   
scoreValue: {
    type: Number,
    default: "0"
},

 tokenValue: {
     type: Number,
       default: "0"
    },
  dateOfToken:{
      type: Date(),
      default: now()
  }
        
},

    },{ collection: 'scoreTokens' }
 )


const scoreTokens = mongoose.model('scoreToken', scoreTokensSchema);
module.exports = scoreTokens;
