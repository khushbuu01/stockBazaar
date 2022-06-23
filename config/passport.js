const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcryptjs=require('bcryptjs');

const signup_model = require('../models/signup');
const signup = signup_model.Signup;

module.exports=function(passport){
    passport.use(new LocalStrategy({usernameField:'userId'},
        (userId, password, done)=> {
          signup.findOne({ userId: userId }, (err, user)=> {
            if (err) { return done(err); }
            if (!user) {
              return done(null, false, { message: 'No user with that userId' });
            }
            bcryptjs.compare(password,user.password,(err,isMatch)=>{
                if(err) throw err;
                if(isMatch){
                    return done(null,user);
                }else{
                    return done(null,false,{ message: 'Incorrect Password'});
                }
            })
          });
        }
      ));
      passport.serializeUser(function(user, done) {
        done(null,user.id);
      });
      
      passport.deserializeUser(function(id, done) {
        signup.findById(id, function(err, user) {
          done(err, user);
        });
      });
}


