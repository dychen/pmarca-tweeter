var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tweetSchema = new Schema({
    text: String,
    createdAt: {type: Date, 'default': Date.now},
});

module.exports = mongoose.model('Tweet', tweetSchema);
