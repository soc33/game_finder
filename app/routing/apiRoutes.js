var games = require('../data/games.js');
var newGames = [];
var path = require("path");

module.exports = function (app) {

    app.get('/api/gameList', function (req, res) {
        res.json(games);
    });

    app.post('/api/gameList', function (req, res) {
        var matchedGame;
        var current;
        var secondCurrentOption;
        var secondOption;

        for (var x in games) {
            var matches = 0;
            var closeMatches = 0;
            for (var i = 0; i < req.body.scores.length; i++) {
                if (parseInt(req.body.scores[i]) === parseInt(games[x].scores[i])) {
                    matches++;
                } else if (Math.abs(req.body.scores[i] - games[x].scores[i]) === 1) {
                    closeMatches++;
                }
                console.log(req.body.scores[i]);
                console.log(games[x].scores[i]);
                console.log("Game " + i + "got " + matches + " matches");
                console.log("Game " + i + "got " + closeMatches + " close matches");
            }

            if (isNaN(current) == false) {
                if (matches > current) {
                    current = matches;
                    if (current !== 0) {
                        matchedGame = games[x];
                    }
                };
            } else {
                current = matches;
                if (current !== 0) {
                    matchedGame = games[x];
                }
            }
            if (isNaN(secondCurrentOption) == false) {
                if (closeMatches > secondCurrentOption) {
                    secondCurrentOption = closeMatches;
                    if (closeMatches !== 0) {
                        secondOption = games[x];
                    }
                };
            } else {
                secondCurrentOption = closeMatches;
                if (closeMatches !== 0) {
                    secondOption = games[x];
                }
            }
        }
        if (matchedGame) {
            res.json(matchedGame);
        } else if (secondOption) {
            res.json(secondOption);
        } else {
            res.json({ name: 'No game found!', photo: '' });
        }
    });

    app.get('/api/gameadd', function (req, res) {
        res.json(newGames);
    });

    app.post('/api/gameadd', function (req, res) {
        var newgame = req.body;
        games.push(newgame);
        newGames.push(newgame);

        res.json(newgame);
    });

    app.post("/api/images/:name", function (req, res) {
        res.sendFile(path.join(__dirname, "./../data/images/" + req.params.name));
    })
};