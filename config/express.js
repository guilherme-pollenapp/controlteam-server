var express = require('express')
    , bodyParser = require('body-parser')
    , load = require('express-load')
    , cors = require('cors')
    , morgan = require("morgan")
    , path = require("path")


module.exports = () => {
    var app = express();

    app.use(cors());

    app.set('secret', 'apenasmaisumtestedevalidacao');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());

    app.use(morgan('dev'))

    app.set('clientPath', path.join(__dirname, '../client'));
    app.use(express.static(app.get("clientPath")));

    load('infra', { cwd: 'app' })
        .then('api')
        .then('routes/auth')
        .then('routes/token')
        .then('routes')
        .then('util')
        .into(app);
    
    app.get("/*", (req, res) => res.sendFile(path.join(app.get('clientPath'), 'index.html')));

    return app;
}
