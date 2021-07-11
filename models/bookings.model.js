
const mongoose = require('mongoose');

const bookSchema={
    From: {type:Date},
    To: {type:Date},
    name:{
        type:String,
        Required:true
    },
    mobilenumber:String,
    username:{
        type:String,
        Required:true
    },
    bench:{
        type:String,
        Required:true
    },
     date:{
         type:String,
         Required:true
     }
   

};

module.exports=Book= mongoose.model("Book",bookSchema);