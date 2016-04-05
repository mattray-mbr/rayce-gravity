// initial setup
var express = require('express');
var bodyParser = require('body-parser');
var logger = require('morgan');





var app = express();

// Application Configuration, not really sure what these do
app.use(logger('dev')); //no idea what this does
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/builds/production/'));  


//--------------- Routes ---------------  
//initial setup route
app.get('/', function(req, res) {
    res.sendFile('index.html', {root : './builds/production/'});
});


// Creating Server and Listening for Connections 
var port = 80
app.listen(port, function(){
  console.log('Server running on port ' + port);

})