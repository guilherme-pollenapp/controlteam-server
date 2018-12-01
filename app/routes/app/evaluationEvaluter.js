module.exports = (app) => {
    var api = app.api.app.evaluationEvaluter(app);

    app.route("/app/evaluation/evaluter/:id/pending")
        .get(api.getPending);

    app.route("/app/evaluation/evaluter/:id/done")
        .get(api.getDone);

    app.route("/app/evaluation/evaluter/:id/historic")
        .get(api.getHistoric);

    app.route("/app/evaluation/evaluter/:id/:evaluted/:evaluter/:position")
        .put(api.update);

    app.route("/app/evaluation/consense/:id/pending")
        .get(api.findConsense)
}