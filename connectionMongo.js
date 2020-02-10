const mongoose = require('mongoose');
const url  = `mongodb+srv://nishitarorazapbuild:vodafonek3750@employeesmongo-k4aqy.mongodb.net/test?retryWrites=true&w=majority`;

mongoose.connect(url,(err)=>{
    if(!err){
        console.log("DB connected!");
    }
    else{
        console.log("error occured!");
    }

},);

require('./modelSchema/employeeSchema');
