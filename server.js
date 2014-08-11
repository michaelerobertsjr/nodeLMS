var express = require ('express'),
    stylus = require('stylus'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose');

// Check if environment is dev if it is not set then set to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

// Handle Stylus CSS pre-processing
function compile(str, path){
    return stylus(str).set('filename', path);
}

app.set('views',__dirname + '/server/views' );
app.set('view engine', 'jade');
app.use(morgan('dev')); // Logging messages to the console
app.use(stylus.middleware(
    {
        src: __dirname + 'public',
        compile: compile

    }
));

// Serve static content from the public folder
app.use(express.static(__dirname = 'public'));

if (env === 'development') {
    mongoose.connect('mongodb://localhost/nodelms');
} else {
    mongoose.connect(process.env.DBCONN);
}

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
   console.log('nodelms db opened');
});
// Create a schema for the collection
var messageSchema = mongoose.Schema({message:String});
// Create a model based on the schema
var Message = mongoose.model('Message', messageSchema);
// A variable that will hold the data that is pulled out of the database
var mongoMessage;
// Find one document and execute the call back to make the data avail for
// later use in a view.
Message.findOne().exec(function(err, messageDoc){
    mongoMessage = messageDoc.message;
});

app.get('/partials/:partialPath', function (req, res) {
   res.render('partials/' + req.params.partialPath);
});

// Finally catch all get requests and route them to index
app.get('*', function(req, res) {
        res.render('index', {
            mongoMessage: mongoMessage
        });
});

// check for port value and set to default if it is not avail
var port = process.env.PORT || 3030;

// Start the server and listen for connections
app.listen(port);
console.log('listening on port:' + port + "...");

