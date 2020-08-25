var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
const User=require('../models/user');
const config=require('../config/database');


module.exports=(passport)=>{
	
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
opts.secretOrKey = config.secret;
passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
	console.log(jwt_payload);
    User.getUserById(jwt_payload.userload._id, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
        	console.log(user);
            done(null, user);
        } else {
            done(null, false);
            // or you could create a new account
        }
    });
}));
}
