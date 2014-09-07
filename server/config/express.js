var express = require ('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    cookieParser = require('cookie-parser'),
    session = require('express-session'),
    passport = require('passport');


module.exports = function(app, config) {
    function compile(str, path) {
        return stylus(str).set('filename', path);
    }

    app.set('views', config.rootPath + '/server/views');
    app.set('view engine', 'jade');
    app.use(morgan('dev')); // Logging messages to the console
    app.use(cookieParser());
    app.use(bodyParser());
    app.use(session({secret: 'node learning management system'}));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use(stylus.middleware(
        {
            src: config.rootPath + 'public',
            compile: compile

        }
    ));

    // Serve static content from the public folder
    app.use(express.static(config.rootPath = 'public'));
};