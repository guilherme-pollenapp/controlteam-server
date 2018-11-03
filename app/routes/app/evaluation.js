module.exports = (app) => {

    var API = app.api.app.evaluation(app);

    app.route("/app/evaluation/:id")
        .get(API.getEvaluation);

    app.route("/app/evaluation/historic/:id")
        .get(API.getHistoric);

    app.route("/app/evaluation/pending/:id")
        .get(API.getPending);

    app.route("/app/evaluation/done/:id")
        .get(API.getDone);

    app.route("/app/evaluation/:id/user/:user")
        .put(API.update);
}