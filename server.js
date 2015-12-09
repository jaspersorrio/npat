// Dependencies
var express = require('express');
var port = process.argv[3] || 7777;
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var ejs = require('ejs');
var fs = require('fs');

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
	teamCode: String,
	validated: {type: Boolean, default: false}
});

var Student = mongoose.model('Student',studentSchema)

// nodeMailer
var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'ngeeannat@gmail.com',
        pass: 'npatnpat'
    }
});


// Express
var app = express();
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/app'));
app.use(bodyParser.json());

// routes
app.use('/bower_components',express.static(__dirname+ "/bower_components"));
app.get('/api/code/:id',function(req,res){

	// extract code
	var teamCode = req.params.id;
	console.log('trying to check for teamCode '+teamCode);

	// check if exist in db.
	Student.find({ 'createGroup': teamCode  },'createGroup game',function(err, leader){
		if(err){
			res.json({
				success:false
			});
		}

		if(leader.length > 0){
			Student.find({ $or :[{'teamCode' : teamCode}, {'createGroup' : teamCode}] }, function(err, student){
				var numberLeft = 10 - student.length;

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
			res.json({
				student : student,
				success: true
			});

			var renderedEjs = ejs.render( fs.readFileSync(__dirname + '/views/email.ejs' , 'utf8'), {stud: student });

			console.log(renderedEjs);
			console.log(student);

			var stripedNumber = student.number.substring(0, student.number.length - 1);
			// send an email
			var mailOptions = {
			    from: 'Ngee Ann AT Club ✔ <ngeeannat@gmail.com>', // sender address
			    to: 's'+ stripedNumber +'@connect.np.edu.sg', // list of receivers
			    subject: 'Ngee Ann AT Club', // Subject line
			    html: renderedEjs
			    // '<b>Hello! Please validate your AT FUNDAY request!</b><br><h2><a href="http://npat.club/api/validate/'+student._id+'">Validate</a></h2>' // html body
			};

			transporter.sendMail(mailOptions, function(error, info){
			    if(error){
			        return console.log(error);
			    }
			    console.log('Message sent: ' + info.response);

			});

		}

	})
	// res.json(req);
});

app.post('/api/student/edit' , function(req,res){
	var stud = req.body;

	delete stud.posting;

	console.log('editing...');
	console.log(stud);
	Student.findById(stud._id,function(err, student){
		if(err){
			res.json({
				success:false,
				error:err
			});
		} else {
			for (var field in Student.schema.paths) {
				console.log(field);
				if ((field !== '_id') && (field !== '__v')) {
					if (stud[field] !== undefined) {
						student[field] = req.body[field];
					}  
				}  
			}

			student.save(function (err) {
				if (err){
					res.json({
						success:false,
						error:err
					});
				} else {
					res.json({
						success:true,
						student: stud
					});
				}
			});

		}
	});
});

app.get('/api/validate/:id', function(req,res){
	var id = req.params.id;

	Student.find({'_id':id},function(err, student){
		if(err){	
			var json = {
				success:false
			};

			res.render('validate',{res:json});

		} else {
			Student.findByIdAndUpdate(id,{ $set :{validated: true}}, function(err, student){
				var json;

				if(err){
					json = {
						success:false
					};
					res.render('validate',{res:json});
				} else {
					console.log(student);


					if(student.group == 'Alone'){
						// if alone
						json = {
							success:true,
							group:"alone",
							stud:student
						};
						res.render('validate',{res:json});
					} else {
						var query;
						// if group
						if(student.joinGroup){
							// by teamcode
							query = student.teamCode;
						} else {
							// by groupcode
							query = student.createGroup;
						}

						Student.find({ $or :[{'teamCode' : query}, {'createGroup' : query}] }, function(err, students){
							console.log(query);
							console.log(students);
							if(err){
								json = {
									success:false
								};
								res.render('validate',{res:json});
							} else {
								json = {
									success:true,
									query:query,
									group: "group",
									stud:students
								};	
								res.render('validate',{res:json});
							}
							
						});	
					} // end check for what query = ?
				}
			});
		}
	});

})

app.get('/all', function(req,res){
	Student.find({},'teamCode createGroup', function(err, students){
		if(err){
			res.json({
				success:false,
				error: err
			})
		} else {
			res.json(students)
		}
	});
})

// app.get('/email', function(req, res){
// 	 var html = ejs.render( fs.readFileSync(__dirname + '/views/email.ejs' , 'utf8'), {stud: { __v: 0,
//   name: 'Jasper',
//   number: '10149149d',
//   hp: 92718779,
//   noShirt: false,
//   game: 'Human Fussball',
//   group: 'Alone',
//   _id: '5667b53ac7e10b995faf9186',
//   validated: false,
//   teamCodeSuccess: false,
//   shirt: 'white',
//   size: 'M',
//   errorMsg: [] }});

// 	 res.send(html);
// })

// Start server
app.listen(port);
console.log("Server hosted on port: "+port);
