var path = require('path');
var rootPath = path.normalize(__dirname + '/../../');

// A configuration object for dev and prod deployments
module.exports = {
    development: {
        db: 'mongodb://localhost/nodelms',
        rootPath: rootPath,
        port: process.env.PORT || 3030
    },
    production: {
        db: process.env.DBCONN,
        rootPath: rootPath,
        port: process.env.PORT || 80
    }
}