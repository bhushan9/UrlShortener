var express = require('express')
var app = express()
var path    = require("path");
var crypto = require("crypto");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://heroku_n7h40qnb:s3nj47ol515hrv42r0h76oo2et@ds149481.mlab.com:49481/heroku_n7h40qnb";

app.set('view engine','pug');

app.get('/',function(req,res){
	//path.join(__dirname+'/index')
	res.render('index');
	
});

app.get('/genurl',function(req,res){
	if (req.method == 'GET'){
	var OrigUrl = req.param('Url');
	
	console.log(OrigUrl);
	var hash = crypto.createHash('sha256').update(OrigUrl).digest("base64").slice(0,8);
	console.log(hash);

	var myObj = { OriginalUrl : OrigUrl, Hash : hash };

	MongoClient.connect(url, function(err, db) {
  	if (err) throw err;

  	db.collection("sampledb").insertOne(myObj,function(err,res){
		if (err) throw err;
		console.log("1 record added");
		
		db.close();
	});

  }); 
	res.render('index',{url : "url="+hash });
} 
});



app.get('/url=*',function(req,res){
	console.log(req.path);
	var query = { Hash : req.path.slice(5)};
	var redirect;

	MongoClient.connect(url, function(err, db) {
  if (err) throw err;
 
  db.collection("sampledb").find(query).toArray(function(err, result) {
    if (err) throw err;
    console.log(result);
    console.log(result[0].OriginalUrl);
    redirect = result[0].OriginalUrl;

    db.close();
    res.redirect(redirect);
  });
});


});





MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  db.createCollection("sampledb", function(err, res) {
    if (err) throw err;
    console.log("Table created!");
    db.close();
  });
});

app.listen(process.env.PORT || 8080);