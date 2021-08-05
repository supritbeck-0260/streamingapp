const mongoose = require('mongoose');

const audioSchema = mongoose.Schema({
    name:{
           type:String,
           require:true,
        },
    path:{
          type:String,
          require:true
        },
    date:{
          type: Date,
          require:true
    }
});

module.exports = mongoose.model('musics',audioSchema);