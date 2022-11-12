const express= require("express");
const app = express();
const path = require("path");
require("./connection/conn");
app.use(express.json());

const student = require("./model/schema");
const static1 = path.join(__dirname,"./login")
const static2 = path.join(__dirname,"./home_page")
const static3 = path.join(__dirname,"./new registration")

 app.use(express.static(static1));
 app.use(express.static(static3));
 app.use(express.static(static2));
 
 app.get("/",function(req,res){
      
    res.sendFile(static2+"/home_page.html");
});
app.get("/login",function(req,res){
      
    res.sendFile(static1+"/login.html");
});

app.get("/newregistration",function(req,res){
      
    res.sendFile(static3+"/new_registration.html");
});
app.get("/registration", async (req,res) => {

    try{
        const user = new  student(req.body);
        const adnew= await user.save();
        res.status(201).send(adnew);
    }catch(e){
        res.status(400).send(e);
    }
})
app.listen(8000, function(){
    console.log("Server is up");
})