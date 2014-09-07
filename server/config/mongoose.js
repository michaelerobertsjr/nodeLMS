var mongoose = require('mongoose'),
    crypto = require('crypto');

module.exports = function(config) {
    mongoose.connect(config.db);

    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error...'));
    db.once('open', function callback() {
        console.log('nodelms db opened');
    });

    var userSchema = mongoose.Schema({
        firstName: String,
        lastName: String,
        username: String,
        salt: String,
        hashed_pwd: String,
        roles: [String] // use a string for 'admin' or 'standard' roles
    });
    userSchema.methods = {
        authenticate: function(passwordToMatch) {
            return hashPwd(this.salt, passwordToMatch) === this.hashed_pwd;
        }
    }
    var User = mongoose.model('User', userSchema);

    User.find({}).exec(function(err, collection){
        if(collection.length === 0){ // if the collection is empty setup some dummy users
            var salt, hash;

            salt = createSalt();
            hash = hashPwd(salt, 'michael');
            User.create({
                firstName: "Michael",
                lastName:"Roberts",
                username: "mroberts",
                salt:salt,
                hashed_pwd: hash,
                roles: ['admin']
            });

            salt = createSalt();
            hash = hashPwd(salt, 'john');
            User.create({
                firstName: "John",
                lastName:"Doe",
                username: "jdoe",
                salt:salt,
                hashed_pwd: hash,
                roles: []
            });

            salt = createSalt();
            hash = hashPwd(salt, 'sam');
            User.create({
                firstName: "Sam",
                lastName:"Smith",
                username: "ssmith",
                salt:salt,
                hashed_pwd: hash});
        }

    })

}
// Create a long random hash string to use as a salt
function createSalt() {
    return crypto.randomBytes(128).toString('base64');
}
// Hash Message Auth Code, create a hex based hash of password using the salt
function hashPwd(salt, pwd){
    var hmac = crypto.createHmac('sha1', salt);
    return hmac.update(pwd).digest('hex');
}