module.exports = function(app){
    app.get('/partials/*', function (req, res) {
        res.render('../../public/app/' + req.params[0]);
    });

    // Finally catch all get requests and route them to index
    app.get('*', function(req, res) {
        res.render('index');
    });
}
