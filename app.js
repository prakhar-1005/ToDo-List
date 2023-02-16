const express= require("express");
const bodyParser= require("body-parser");
const moment = require("moment/moment");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

let tasks=["buy food" ,"cook food","eat food"];  // for home page
let workItems=["Eat","Sleep","Code","Repeat"];  // for work page



//get requests
app.get("/" , function(req,res){
    let date=moment().format('DD-MM-YYYY');

    res.render("list",{listTitle:date, kindOfTasks:tasks});
});

app.get("/work",function(req,res){

    res.render("list", {listTitle:"Work List",kindOfTasks: workItems});    // we can pass direct values also with EJS
 })

app.get("/about",function(req,res){
    res.render("About");
})


//post request
app.post("/",function(req,res){
    console.log(req.body.newItem);    /* 1) body of the request made by the user (which is the text) is displayed in the console 
                                         2) 'newItem' is the name of the input tag we created */
    console.log(req.body);

    let task=req.body.newItem;
    if(req.body.submitButton==="Work"){
        workItems.push(task);
        res.redirect("/work");  // redirects to the get("/work") and not post("/work")
    }else{
        tasks.push(task);
        res.redirect("/");      // redirects to the get("/") and not post("/")
    }
});


// app.post("/work",function(req,res){    DOES NOT WORK BECAUSE OUR HTML FORM ALWAYS MAKES POST REQUEST TO HOME ROUTE ONLY  
//     console.log(req.body.item);
//     let work=req.body.newItem;
//     workItems.push(work);
//     res.redirect("/work");
// });


app.listen(3000, function(){
    console.log("server is running on port 3000");
});