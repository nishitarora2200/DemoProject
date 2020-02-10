const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Name should not be empty"]
        
    },
    gender:{
        type:String,
        required:[true]
    },
    trade:{
        type:String,
        required:[true,"trade should not be empty"]
    },
    emp_id:{
        type:String,
        unique:true,
        required:[true,"Employee id should not be empty"]
    },
    dob:{
        type:String,
        required:true
    },
    age:{
    type:Number,    
    default:function()
      {
        let value = this.dob;
        let year = value.split('-');
        return 2020-parseInt(year[0])
      }
    },
    address:{
        type:String,
        required:true
    }

})
const Employee = mongoose.model('Employee',employeeSchema);
module.exports = Employee;