var mongoose = require('mongoose');
var fs = require('fs');
var Tweet = require('../models/tweet');

var run = function() {
    fs.readFile('./data/tweets.json', 'utf-8', function(err, fileData) {
        if (err) return console.error(err);

        var tweets = JSON.parse(fileData);
        for (var i = 0; i < tweets.length; i++) {
            new Tweet({ text: tweets[i] }).save(function(err, newTweet) {
                console.log(newTweet.createdAt + ': Inserted new tweet');
            });
        }
    });
}

mongoose.connect('mongodb://localhost/pmarca_tweeter');
var db = mongoose.connection;
db.once('open', function (callback) {
    run();
});
