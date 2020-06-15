//import React from 'react';
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const port = 3000;
const mongouri = "mongodb+srv://malikmati:914oA8vUwFFQV8Hm@cluster0-6wchl.mongodb.net/test?retryWrites=true&w=majority"
require('./Employee.js')

app.use(bodyParser.json())

const Employee = mongoose.model("employee")
mongoose.connect(mongouri,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on("connected",()=>{
    console.log("Connected to MongoDb")
})
mongoose.connection.off("connected",()=>{
    console.log("Not Connected to MongoDb")
})
app.get(('/'),(req,res)=>{
    Employee.find({}).then(data=>{
        res.send(data)
    }).catch(err=>{console.log(err)})
})
app.post('/send',(req,res)=>{
    const employee = new Employee({
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    })
    employee.save().then(data=>{console.log(data)
        res.send(data);
    }).catch(err=>{console.log(err)})}
)
app.post('/delete',(req,res)=>{
    Employee.findByIdAndRemove(req.body.id).
    then(data=>{console.log(data)
    res.send(data);
    }).catch(err=>{console.log(err)})
})
app.post('/update',(req,res)=>{
    Employee.findByIdAndUpdate(req.body.id,{
        name:req.body.name,
        email:req.body.email,
        phone:req.body.phone,
        picture:req.body.picture,
        salary:req.body.salary,
        position:req.body.position
    }).then(data=>{console.log(data)
        res.send(data);
        }).catch(err=>{console.log(err)})
})

app.listen(3000,process.env.IP||'0.0.0.0');

