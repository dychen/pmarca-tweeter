var mongoose = require('mongoose');
var fs = require('fs');
var async = require('async')
var Tweet = require('../models/tweet');

var run = function() {
    var loadData = function(gen, callback) {
        fs.readFile('./data/tweets-' + gen + '.json', 'utf-8', function(err, fileData) {
            if (err) return console.error(err);

            var tweets = JSON.parse(fileData);
            for (var i = 0; i < tweets.length; i++) {
                new Tweet({ generation: gen, text: tweets[i] }).save();
            }
        });
    }

    var MAX_GEN = 2;
    async.parallel([
        async.apply(loadData, 1),
        async.apply(loadData, 2),
        async.apply(loadData, 3),
        async.apply(loadData, 4),
        async.apply(loadData, 5)
    ], function(err, results) {
        console.log('Done loading data');
    });
}

mongoose.connect('mongodb://localhost/pmarca_tweeter');
var db = mongoose.connection;
db.once('open', function (callback) {
    run();
});
