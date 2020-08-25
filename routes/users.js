var express = require('express');
var router = express.Router();
var passport= require('passport');
var jwt=require('jsonwebtoken');
var user=require('../models/user');
const config=require('../config/database');

router.post('/register', function(req, res, next) {
 let newuser= new user({
 	name:req.body.name,
 	email:req.body.email,
 	password:req.body.password,
 	username:req.body.username,
 });

	user.addUser(newuser,(err,user)=>{
		if(err){
		res.json({'succes':"false",'msg':"registration failed"});
	}else{
		res.json({'succes':"true",'msg':"registration succesful ","user": user});
	}
	});
});


router.post('/auth', function(req, res, next) {
  const username=req.body.username;
  const password=req.body.password;

  user.getUserByName(username,(err,userload)=>{
  	if(err){
  		throw err;
  	}
  	if(!userload){
  		return res.json({success:"false",msg:"User not found"});
  	}

  	user.comparepassword(password,userload.password,(err,ismatch)=>{
  		if(err) {
  			res.json({success:"false",msg:'falied'});
  		}
  		if(ismatch){
  			 // let token = jwt.sign({  uid: user.data.id }, config.secret, { expiresIn: '3h' });
  			// const token=jwt.sign(userload._id,config.secret, {expiresIn: '1h'});
  			const token = jwt.sign({userload}, config.secret, {expiresIn: 604800});
        // res.json({success:"true",msg:'falied'})
  			res.json({
  				success:"true",
          msg:"Logged in",
  				token: 'JWT ' + token,
  				user:{
  					id:userload._id,
  					name:userload.name,
  					username:userload.username,
  					email:userload.email
  				}
  			});


  		}else{
  			res.json({'success':"false",'msg':"Wrong password"});
  		}
  	});
  });
});

router.get('/profile',passport.authenticate('jwt', {session:false}), function(req, res, next) {
  // console.log(req.user)
  res.json({user:req.user});
});



module.exports = router;