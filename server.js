// Dependencies
var express = require('express');
var port = process.argv[3] || 7777;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// MongoDB
mongoose.connect('mongodb://localhost/npat');
var Schema = mongoose.Schema;

// @@ params
// createGroup: "c9lgl"
// game: "Dragon Ball"
// group: "Group"
// hp: "92718779"
// joinGroup: false
// name: "Jasper"
// noShirt: true
// number: "10149149d"
// shirt: "white"
// size: "S"
// teamCode: "asdfasd"

var studentSchema = new Schema({
	createGroup: String,
	game: String,
	group: String,
	hp: Number,
	joinGroup: Boolean,
	name: String,
	noShirt: Boolean,
	number: String,
	shirt: String,
	size: String,
	teamCode: String
});

var Student = mongoose.model('Student',studentSchema)


// Express
var app = express();
app.use(express.static(__dirname+'/dist'));
app.use(bodyParser.json());

// routes
// app.use('/bower_components',express.static(__dirname+ "/bower_components"));
app.get('/api/code/:id',function(req,res){

	// extract code
	var teamCode = req.params.id;
	console.log('trying to check for teamCode '+teamCode);

	// check if exist in db.
	Student.find({ 'createGroup': teamCode },'createGroup game',function(err, leader){
		if(err){
			res.json({
				success:false
			});
		}

		if(leader.length > 0){
			Student.find({'teamCode' : teamCode}, function(err, student){
				var numberLeft = 9 - student.length;

				res.json({
					success:true,
					student :leader,
					numberLeft: numberLeft
				});	
			})
		} else {
			res.json({
				success:false
			})
		}
		
	});
});

app.post('/api/student',function(req, res){
	var student = req.body;

	Student.create(student,function(err, student){
		if(err){
			res.json({
				success:false
			});
		} else {
			res.json(student);
		}

		// send an email

	})
	// res.json(req);
})

// Start server
app.listen(port);
console.log("Server hosted on port: "+port);
