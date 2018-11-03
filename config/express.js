var express = require('express')
    , bodyParser = require('body-parser')
    , load = require('express-load')
cors = require('cors');


module.exports = () => {
    var app = express();

    app.use(cors());

    app.set('secret', 'apenasmaisumtestedevalidacao');

    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());


    load('infra', { cwd: 'app' })
        .then('api')
        .then('routes/auth')
        .then('routes/token')
        .then('routes')
        .then('util')
        .into(app);

    return app;
}
