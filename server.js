var express = require ('express');

// Check if environment is dev if it is not set then set to development
var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

var config = require('./server/config/config')[env];

require('./server/config/express')(app, config);

require('./server/config/mongoose')(config);

require('./server/config/passport')();

require('./server/config/routes')(app);

// Start the server and listen for connections
app.listen(config.port);
console.log('listening on port:' + config.port + "...");