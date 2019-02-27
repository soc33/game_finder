var path = require("path");

module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"));
    });

    app.get("/add", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/addGame.html"));
    });

    app.get("/find", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/survey.html"));
    });
}


