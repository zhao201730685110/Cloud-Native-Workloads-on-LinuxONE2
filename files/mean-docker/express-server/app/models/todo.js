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
        type: String,
        default: ''
    }


});
