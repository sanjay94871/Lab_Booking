
const mongoose = require('mongoose');

const userSchema={
    name:{
        type:String,
        Required:true
    },
    mobilenumber:String,
    username:{
        type:String,
        Required:true,
        unique:true
    },
    password:String
};

module.exports=User= mongoose.model("User",userSchema);