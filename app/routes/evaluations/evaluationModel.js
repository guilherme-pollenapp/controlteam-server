module.exports = (app) => {

    var APIModel = app.api.evaluations.evaluationModel(app);

    app.route("/evaluation/model")
    .get(APIModel.findModels)
    .post(APIModel.insert);

    app.route("/evaluation/model/company/:id")
    .get(APIModel.findModelsByCompany);

    app.route("/evaluation/model/:id")
    .get(APIModel.findModelsById)
    .put(APIModel.update);

}