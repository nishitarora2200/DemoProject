const express = require('express');
const app = express();
const path = require('path');
const connect = require('./connectionMongo');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Employee = require('./modelSchema/employeeSchema');
let data;
const parser = bodyParser.urlencoded({extended:false});
app.set('views','./views');
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.get('/contact',(req,res)=>{
    res.render('index');
})

app.get('/contact/:id',(req,res)=>{
    const id = req.params.id;
    
    Employee.findById(id).then(result=>{
 
        res.render('update.ejs',{
            name:result.name,
            gender:result.gender,
            trade:result.trade,
            emp_id:result.emp_id,
            id:result._id,
            address:result.address,
            dob:result.dob
        });
    });
    })
    
app.get('/employees',(req,res)=>{
    Employee.find().then(result=>{
        res.render('employees',{
            employees:result
    
        })
    })
    
})
app.post('/contact',parser,(req,res)=>{
    const data = new Employee({
        name:req.body.name,
        gender:req.body.gender,
        trade:req.body.trade,
        emp_id:req.body.emp_id,
        dob:req.body.dob,
        address:req.body.address
    })
    data.save((result)=>{
        console.log(result);
        res.redirect('/employees');
        
    })
    
    
})
app.post('/contact/update/:id',parser,(req,res)=>{
    
    const updatedData = req.body;
    const id = req.params.id;
    console.log(req.body);
    Employee.findByIdAndUpdate(id,updatedData).then(result=>{
        console.log(result);
        res.redirect('/employees');
    }).catch(err=>{
        console.log(err);
    })

});

app.get('/contact/delete/:id',parser,(req,res)=>{
    const id = req.params.id;
    Employee.findByIdAndDelete(id).then(result=>{
        console.log("deletion successfull!");
        res.redirect('/employees');
    })
})


app.listen(8000,(req,res)=>{
    console.log("server is listening");
})
