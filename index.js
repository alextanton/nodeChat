var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongo = require("mongodb");
var mongoClient = new mongo.MongoClient();

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(require('body-parser').urlencoded({extended: true}))

app.use(express.static(__dirname + '/js'));
app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  mongoClient.connect("mongodb://localhost:27017/messages", function(err, db){
  			db.collection("messages").find().toArray(function(err, result){
  			console.log(result);
  			res.render('home', {ms: result});
  		});
  	});
});

http.listen(3000, function(){
  console.log('wtf');
});

io.on('connection', function(socket){
  socket.on('chat send', function(msg){
  	mongoClient.connect("mongodb://localhost:27017/messages", function(err, db){
  		db.collection("messages").insert({"sender": "alex", "receiver": "brittany", "messge": msg});
  	})
    io.emit('chat send', msg);
  });
});