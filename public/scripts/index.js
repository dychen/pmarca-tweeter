$(document).ready(function() {
    var model = {
        tweets: ko.observableArray([])
    };

    $('#tweet-button').click(function() {
        $.get('/api/tweet', function(data) {
            model.tweets.unshift({ text: data });
        });
    });

    /* On page load */

    $.get('/api/tweets', function(tweets) {
        for (var i = 0; i < tweets.length; i++) {
            model.tweets.unshift({ text: tweets[i]});
        }
    });

    ko.applyBindings(model);
});
