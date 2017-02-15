var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var mongo = require("mongodb");
var mongoClient = new mongo.MongoClient();
var cookieParser = require('cookie-parser');
var people = ['alexander', 'brittany']

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.use(require('body-parser').urlencoded({extended: true}))

app.use(cookieParser());

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/js'));

app.get('/', function(req, res){
  mongoClient.connect("mongodb://localhost:27017/messages", function(err, db){
  			db.collection("messages").find().toArray(function(err, result){
  				result.forEach(function(t){
  					if(t.sender==req.cookies.user){
  						t.format = true;
  					} else{
  						t.format = false;
  					}
  				})
  				if(req.cookies.user == "brittany"){
  					var rec = "alexander";
  				} else{
  					var rec = "brittany";
  				}
  				res.render('home', {ms: result, receiver: rec});
  				db.close();
  		});
  });
});

app.get("/YWxleGFuZGVy", function(req, res){
	res.cookie("user", "alexander");
	res.redirect("/");
})

app.get("/YnJpdHRhbnk=", function(req, res){
	res.cookie("user", "brittany");
	res.redirect("/");
})

http.listen(3000, function(){
  console.log('wtf');
});

io.on('connection', function(socket){
  socket.on('chat send', function(options){
  	mongoClient.connect("mongodb://localhost:27017/messages", function(err, db){
  		var to;
  		if(options.from.split("=")[1] == "alexander"){
  			to = "brittany";
  		} else{
  			to = "alexander"
  		}
  		db.collection("messages").insert({"sender": options.from.split("=")[1], "receiver": to, "format": null,"message": options.msg});
  	})
    io.emit('chat send', options);
  });
});