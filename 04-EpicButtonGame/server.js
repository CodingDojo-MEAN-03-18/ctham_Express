//// Load the express module 
var express = require("express");
var path = require("path");

//// Invoke var express and store the resulting application in var app
var app = express();

//// This is the line that tells our server to use the "/static" folder for static content
app.use(express.static(__dirname + "/static"));
console.log(__dirname);

//// This sets the location where express will look for the ejs views
app.set('views', __dirname + '/views'); 
app.set('view engine', 'ejs');

//// Express Body-parser
// var bodyParser = require('body-parser');
// app.use(bodyParser.urlencoded({extended: true}));

//// Express Session
// var session = require('express-session');
// app.use(session({
//     secret: 'codingdojorocks', 
//     resave: true, 
//     saveUninitialized: true
// }));  

app.get("/", function (request, response){
    response.render('index');
})

//// Tell the express app to listen on port 8000
var server = app.listen(8000, function() {
    console.log("listening on port 8000");
});
var io = require('socket.io').listen(server);

let count = 0;

//*** Configure server side sockets
io.sockets.on('connection', function (socket) {
    console.log("Client/socket is connected!");
    console.log("Client/socket id is: ", socket.id);
    // all the server socket code goes in here
    socket.on("client_epic", function (){
        count ++;
        console.log('js emitData', count);
        socket.emit('server_cnt', {response: count});
    })
    socket.on("client_reset", function (){
        count = 0;
        console.log('js emitData', count);
        socket.emit('server_cnt', {response: count});
    })
})
//// this line will almost always be at the end of your server.js file 
