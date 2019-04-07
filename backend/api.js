const ApiBuilder = require('claudia-api-builder');
const api = new ApiBuilder();

const Twit = require('twit');

const T = new Twit({
    consumer_key: 'FWq9a1ZWyNs6gSy0vuQoMimlY',
    consumer_secret: process.env.CONS_SECRET,
    access_token: '848122671007137792-O0ZtzNlfnxtQRLve54xvzYbHUnxTCAx',
    access_token_secret: process.env.ACCESS_TOKEN_SECRET,
    timeout_ms: 60 * 1000
});

const username = 'frankdeboosere';

api.get('/frankTweet', function(request) {
    return T.get(
        'statuses/user_timeline',
        { screen_name: username, count: 10, tweet_mode: 'extended' },
        function(err, data, response) {
            return data;
        }
    );
});

api.get('/ping', function(request) {
    return 'pong';
});

module.exports = api;
