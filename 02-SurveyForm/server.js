//// Load the express module (Where do you think this comes from?)
var express = require("express");

//// Invoke var express and store the resulting application in var app
var app = express();

//// This is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
console.log(__dirname);

//// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

//// Express Body-parser
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

//// Express Session
var session = require('express-session');
app.use(session({
    secret: 'codingdojorocks', 
    resave: true, 
    saveUninitialized: true
}));  

app.get("/", function (request, response){
    response.render('index');
})

app.post("/submit", function (request, response){
    console.log('*** submit ***');
    console.log(request.body);
    request.session.name = request.body.name;
    request.session.location = request.body.location;
    request.session.language = request.body.language;
    request.session.comment = request.body.comment;
    response.redirect('/result');
})

app.get("/result", function (request, response){
    console.log('*** result ***');
    console.log(request.body);
    name = request.session.name;
    location = request.session.location;
    language = request.session.language;
    comment = request.session.comment;
    response.render('result');
})

//// Tell the express app to listen on port 8000
app.listen(8000, function() {
    console.log("listening on port 8000");
})
//// this line will almost always be at the end of your server.js file 
