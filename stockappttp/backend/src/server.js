const express = require('express');
var cors = require('cors')
const MongoClient = require('mongodb').MongoClient;//Used to create database for information to go to, online resource.
const db = require('config/db');//Used to link to the config of DataBase
const bodyParser = require('body-parser');
var app = express();
const port = 5000;
const response = require('./response.js');
const handleListen = require('./handleListen.js');
//https://github.com/expressjs/cors

app.use(bodyParser.json({limit: '100mb'}));
app.use(bodyParser.urlencoded({limit: '100mb', extended: true}));
app.use(cors());



// Let app start listening to port, will output error if anything goes wrong
const client = new MongoClient(db.uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("TTPDB").collection("TTPDB");
  const { assessmentRoutes, initAssessmentRoutes } = require('routes/SignIn');
  initAssessmentRoutes({db : collection});
  if (err) return console.log(err)
  app.use('/dbRoute', assessmentRoutes);
});

app.listen( port, handleListen(console.log, port) );      
  app.get('/', response.hello);
  app.get( '/express_backend', response.express_backend);

