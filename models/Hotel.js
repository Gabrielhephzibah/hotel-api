const mongoose = require('mongoose');

const HotelSchema = mongoose.Schema({
    first_name:{
        type: String,
        required: false
    },

    last_name:{
        type: String,
        required: false
    },

    sex:{
        type:String,
        required: false
    },

    check_in_time:{
        type: Date,
        default: Date.now
    },

    check_out_time:{
        type: Date,
        default: null
        
    },


    room_number:{
        type: String,
        required: false
    },

    room_type:{
        type: String,
        required: false
    },

    // advance_payment:{
    //     type:String,
    //     required: true
    // },

    purpose_for_stay:{
        type:String,
        required: false
    },

    final_bill:{
        type: Number,
        required: false
    },

    created_at:{
        type: Date,
        default: Date.now
    },
});

const Hotel = module.exports = mongoose.model('Hotel', HotelSchema);