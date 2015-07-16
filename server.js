var express = require('express');
var mongoose = require ('mongoose');
var async = require('async');
var app = express();
var Tweet = require('./server/models/tweet');

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

/* Database */

mongoose.connect('mongodb://' + process.env.MONGOLAB_URI + '/pmarca_tweeter');

/* Routes */

var getRandomTweet = function(gen, callback) {
    Tweet.find({ generation: gen }).count(function(err, count) {
        if (err) return callback(err);

        var rand = Math.floor(Math.random() * count);
        Tweet.findOne({ generation: gen }).skip(rand).exec(function(err, tweet) {
            callback(null, tweet.text);
        });
    });
}

app.get('/', function(req, res) {
    res.render('pages/index');
});

app.get('/api/tweet', function(req, res) {
    var gen = Number(req.query.gen);

    getRandomTweet(gen, function(err, tweet) { res.send(tweet); });
});

app.get('/api/tweets', function(req, res) {
    var indices = [];
    async.parallel([async.apply(getRandomTweet, 5),
                    async.apply(getRandomTweet, 5),
                    async.apply(getRandomTweet, 5)],
        function(err, results) {
            if (err) return err;
            res.send(results);
    });
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});


