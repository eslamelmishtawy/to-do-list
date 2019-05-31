const express = require("express");
const body_parser = require("body-parser");

const app = express();

app.use(express.static("public"));

app.use(body_parser.urlencoded({     // to support URL-encoded bodies
    extended: true
  })); 

//Allow us to use ejs to render html with express
app.set('view engine', 'ejs')

var list = ["Buy food"];

// Date Formatter Function

function formatDate(date) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];

    var dayNames = [
        "Sunday", "Monday", "Tuesday",
        "Wednesday", "Thursday", "Friday", "Saturday"
      ];
  
    var day = date.getDate();
    var monthIndex = date.getMonth();
    var year = date.getFullYear();
  
    return dayNames[date.getDay()] + ', ' + monthNames[monthIndex] + ' ' + day;
}



app.get("/", function(req,res){
    let date = new Date();

    res.render("index",
    {date: formatDate(date), newListItem: list});

});

app.post("/",function(req,res){
    let newItem = req.body.newItem;
    list.push(newItem);
    console.log(list);

    res.redirect("/")
});


app.listen(process.env.PORT || 3000, function(){
    console.log("Server is running on port 3000");
});
