const mongoose=require('mongoose');
const bcrypt=require('bcryptjs');
const config=require('../config/database');

//user schemea

const userSchema=mongoose.Schema({
	name:{
		type:String
	},
	email:{
		type:String,
		required:true
	},
	username:{
		type:String,
		required:true
	},
	password:{
		type:String,
		required:true
	},

});

const User=module.exports=mongoose.model('User',userSchema);

module.exports.getUserById=function(id,callback){
	User.findById(id,callback);
}
module.exports.getUserByName=function(name,callback){
	const query={
		username:name
	};
	User.findOne(query,callback);
}

module.exports.addUser=function(newuser,callback){
	bcrypt.genSalt(10)
	.then((salt)=>{
		bcrypt.hash(newuser.password,salt).then((hash)=>{
			newuser.password=hash;
			newuser.save(callback);
		});
	}).catch((err)=>{
		console.log(err);
	});
}

module.exports.comparepassword=function(candidatepassowrd,hash,callback){
	bcrypt.compare(candidatepassowrd,hash,(err,ismatch)=>{
		if(err) throw err;
		callback(null,ismatch);
	});
}