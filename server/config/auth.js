// Auth will check if user is logged in and will handle state through the app
var passport = require('passport');

exports.authenticate = function(req, res, next){
    var auth = passport.authenticate('local', function(err, user){
        // Handle error(s) first
        if(err){
            return next (err);
        }
        // If no user was found set success
        if(!user){
            res.send({success: false})
        }
        // If user was found set success and then send back with user
        req.logIn(user, function(err){
            if(err){
                return next(err);
            }
            res.send({success:true, user:user});
        })
    });
    auth(req, res, next);
};

exports.requiresApiLogin = function(req, res, next) {
    if(!req.isAuthenticated()) {
        res.status(403);
        res.end();
    } else {
        next();
    }
};

exports.requiresRole = function(role) {
    return function(req, res, next) {
        // Important: need to check if there is a logged in user as well as authorized
        // if user is not logged in then req.user will be undefined
        if(!req.isAuthenticated() || req.user.roles.indexOf(role) === -1 ) {
            res.status(403);
            res.end();
        } else {
            next();
        }
    }
};