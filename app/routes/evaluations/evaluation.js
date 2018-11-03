module.exports = (app) => {

    let evaluationAPI = app.api.evaluations.evaluation(app);

    app.route("/evaluation/new/company/:id")
        .get(evaluationAPI.getByCompany)
        .post(evaluationAPI.insert);
    
    app.route("/evaluation/evaluter/:id")
        .get(evaluationAPI.getByEvaluter);
    
    app.route("/evaluation/evaluted/:id")
        .get(evaluationAPI.getByEvaluted);

}