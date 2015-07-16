$(document).ready(function() {
    var model = {
        tweets: ko.observableArray([])
    };

    $('#tweet-button').click(function() {
        var gen = $('#gen-slider').slider('value');
        $.get('/api/tweet', { gen: gen }, function(data) {
            model.tweets.unshift({ text: data });
        });
    });

    $('#gen-slider').slider({
        range: 'min',
        min: 1,
        max: 5,
        value: 5
    });

    /* On page load */

    $.get('/api/tweets', function(tweets) {
        for (var i = 0; i < tweets.length; i++) {
            model.tweets.unshift({ text: tweets[i]});
        }
    });

    ko.applyBindings(model);
});
