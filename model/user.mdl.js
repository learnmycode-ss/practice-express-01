const mongoose = require('mongoose');

const useSchema = new mongoose.Schema({
    username:{
        type : String,
        require : true,
        unique : true
    },
    password:{
        type : String,
        require : true,
    }
})

module.exports = mongoose.model('User',useSchema);  