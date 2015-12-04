var express = require('express');
var port = process.argv[2] | 7777;
var app = express();

app.use(express.static(__dirname+'/app'));

console.log("Server hosted on port: "+port);

app.listen(port);

