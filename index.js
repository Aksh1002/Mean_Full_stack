//imports

var express=require('express');
var mongoose=require('mongoose');
var path=require('path');
var bodyparser=require('body-parser');
var cors=require('cors');
var passport=require('passport');

//user imports
var config=require('./config/database');

//routes
var usersRouter = require('./routes/users');

//database
mongoose.connect(config.database);

// mongoose.connection.on('error',(err)=>{
// 	console.log('db error '+err);
// });


const app=express();
var port=process.env.PORT || 8080;

app.use(cors());

app.use(bodyparser.json());
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
//set static
app.use(express.static(path.join(__dirname,'public')));
app.use('/users', usersRouter);
app.get('*',(req,res,next)=>{
	res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(port,()=>{
	console.log("server started on port"+port);
});

