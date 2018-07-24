module.exports = (app) => {
    var api = app.api.function(app);

    app.route("/function")
    .get(api.get)
    .post(api.insert);

    app.route("/function/:id")
    .get(api.getByFunctions)
    .put(api.update)
    .delete(api.delete);

    app.route("/function/company/:id")
    .get(api.getByCompany);

    app.route("/function/sector/:id")
    .get(api.getBySector);

    app.route("/function/position/:id")
    .get(api.getByPosition);
}