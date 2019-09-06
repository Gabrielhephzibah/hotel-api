const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

const user = module.exports = mongoose.model('user', userSchema);