var express = require('express');
var port = process.argv[2] || 7777;
var app = express();

app.use(express.static(__dirname+'/app'));

app.use('/bower_components',express.static(__dirname+ "/bower_components"));

app.listen(port);

console.log("Server hosted on port: "+port);
