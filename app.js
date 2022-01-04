const express=require("express");
const app=express();

const path=require("path");
const fs=require('fs');

const port =80;
const hostname= "127.0.0.1";

app.use('/static',express.static('static'));
app.use(express.urlencoded())

app.set('view engine',"pug");
app.set("views",path.join(__dirname,"views"));


//Endpoint
app.get("/",(req,res)=>{
    res.status(200).render('index.pug')
})
app.get("/apply",(req,res)=>{
    res.status(200).render('free_trial.pug')
})
app.post("/apply",(req,res)=>{
    first_name=req.body.first_name
    last_name=req.body.last_name
    age=req.body.age
    number=req.body.number
    email=req.body.email

    let outputtowrite=`name is ${first_name} ${last_name} ,age is ${age}, number and email is ${number} ${email} `
    fs.writeFileSync('./static/data.txt',outputtowrite);

    console.log(req.body)
    res.status(200).render('uploaded.pug',{ title: 'Status', message:"Your Application has been submitted successfully."})
})
app.get("/explore",(req,res)=>{
    res.status(200).render('explore.pug')
})

app.get("/about",(req,res)=>{
    res.status(200).render('about.pug')
})
app.listen(port,()=>{
    console.log(`Server running at port ${port} in url http://${hostname}:${port} `);

})