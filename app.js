var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var mongojs = require('mongojs');
var db = mongojs('goaltracker', ['goals']);

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'client')));

app.get('/', function(req, res){
	res.send('itWorks!');
});

app.get('/goals', function(req, res){
	db.goals.find(function(err, docs){
		if(err){
			res.send(err);
		}else{
			console.log('Getting goals...');
			res.json(docs);
		}
	});
});

app.post('/goals', function(req, res){
	db.goals.insert(req.body, function(err, docs){
		if(err){
			res.send(err);
		}else{
			console.log('Adding goals...');
			res.json(docs);
		}
	});
});

app.listen(3000);
console.log('Running on port 3000...');