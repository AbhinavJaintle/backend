const http = require('http');
const hostname = 'localhost';
const port = 6069;
const bodyParser = require('body-parser');
var mongodb= require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1:27017';


const cors = require('cors'); //very important to give access to the server to other servers
var express = require('express')
var app = express()
app.use(bodyParser.urlencoded({ extended: true }));
var jsonParser = bodyParser.json(); //important to parse the json data
app.use(cors());
app.options('*', cors());

app.get('/get', function(req, res) {
  const id = req.query._id;
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    dbo.collection("Student").find({}).toArray(function(err, result) {
      if (err) throw err;
      for(val in result){
        if(result[val]._id == id){
          console.log(result[val]);
          res.send(result[val]);
        }
      }
      db.close();
    });
  }); 
})


app.post('/create', jsonParser, function(req, res) {


  console.log('receiving data ...');
  console.log(req.body);

  MongoClient.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}, (err, client) => {
  if (err) {
      return console.log(err);
  }

  
  const db = client.db('test');

  console.log(`MongoDB Connected: ${url}`);

  var myobj = {};
  for(val in req.body){
   myobj[val] = req.body[val];
  }
  db.collection("Student").insertOne(myobj,function(err, res) {
    if (err) throw err;
    console.log("1 document inserted");
    client.close();
  });

});
  res.send(req.body);

});


app.post('/delete', jsonParser, function(req, res) {

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myquery = { _id: req.body._id };
    dbo.collection("Student").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      res.send('Document deleted successfully');
      db.close();
    });
  }); 
})


app.post('/update', jsonParser, function(req, res) {

  console.log('receiving data ...');
  console.log(req.body);

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("test");
    var myquery = { _id: req.body._id };
    var newObj = {};
    for(val in req.body){
      newObj[val] = req.body[val];
     }
    var newvalues = { $set: newObj };
    dbo.collection("Student").updateOne(myquery, newvalues, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
      
    });
    dbo.collection("Student").find({}).toArray(function(err, result) {
      if (err) throw err;
      for(val in result){
        if(result[val]._id == req.body._id){
          console.log(result[val]);
          res.send(result[val]);
        }
      }
      db.close();
    });
  }); 
})

app.listen(port);
console.log(`Server running at http://${hostname}:${port}/`);



