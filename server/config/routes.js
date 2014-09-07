var auth = require('./auth'),
    mongoose = require('mongoose'),
    User = mongoose.model('User');

module.exports = function(app){

    app.get('/api/users', auth.requiresRole('admin'), function(req, res){
        User.find({}).exec(function(err, collection){
            res.send(collection);
        })
    });

    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    app.post('/login', auth.authenticate);

    app.post('/logout', function(req, res) {
        req.logout();
        res.end();
    });

    // Finally catch all get requests and route them to index
    app.get('*', function(req, res) {
        // pass the user object to persist the current user when page refreshes
        // bootstrapped here so that we can pass to jade template.
        res.render('index', {
            bootstrappedUser: req.user
        });
    });
}
