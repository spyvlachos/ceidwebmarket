const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }


},
    { collection: 'admins' }
)
const Admins = mongoose.model('adminSchema', adminSchema);
module.exports = Admins;