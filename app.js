var express = require('express')
var app = express()
var path    = require("path");
var crypto = require("crypto");
var MongoClient = require('mongodb').MongoClient;

app.get('/',function(req,res){
	res.sendFile(path.join(__dirname+'/index.html'));
});

app.get('/genurl',function(req,res){
	if (req.method == 'GET'){
	var OrigUrl = req.param('Url');
	
	console.log(OrigUrl);
	var hash = crypto.createHash('sha256').update(OrigUrl).digest("base64").slice(0,8);
	console.log(hash);
/*
	var myObj = { OriginalUrl : OrigUrl, MiniUrl : Age };

	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;

  	db.collection("sampledb").insertOne(myObj,function(err,res){
		if (err) throw err;
		console.log("1 record added");
		db.close();
	});

  }); */
} 
});


	




var url = "mongodb://localhost:27017/mydb";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("sampledb", function(err, res) {
    if (err) throw err;
    console.log("Table created!");
    db.close();
  });
});

app.listen(8080);