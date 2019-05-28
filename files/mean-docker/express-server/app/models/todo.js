var mongoose = require('mongoose');

// Define the schema
module.exports = mongoose.model('Todo', {
    name: {
        type: String,
        default: ''
    },
    
    id:{
        type:String,
        default:''
    },

    balance: {
        type: Number,
        default: 0.0
    },

    withdraw:{
        type:Number,
        default:0.0
    },

    transfer:{
        type:Number,
        default:0.0
    }


});
