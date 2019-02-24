var friends = require("../data/friends");
var express = require("express");

module.exports = function(app) {

    app.get("/api/friends", function (req, res) {
        console.log("seeing the display");
        res.json(friends);  
    });

    app.post("/api/friends", function (req, res) {
        
        var bestMatch = {
            name: "",
            photo: "",
            matchDiff: Infinity
        };

        var userData = req.body;
        var userScores = userData.scores;
        var totalDif;

        for (var i = 0; i < friends.length; i++) {
            
            var currentFriend = friends[i];
            totalDif = 0;

            for (var j = 0; j < currentFriend.scores.length; j++) {
                var currentFriendScore = currentFriend.scores[j];
                var currentUserScore = userScores[j];

                totalDif += Math.abs(parseInt(currentUserScore) - parseInt(currentFriendScore));
            }

            if (totalDif <= bestMatch.matchDiff) {
                bestMatch.name = currentFriend.name;
                bestMatch.photo  = currentFriend.photo;
                bestMatch.matchDiff = totalDif;
            }
        }
        console.log(userData);
        friends.push(userData);
        res.json(bestMatch);
    });
};
