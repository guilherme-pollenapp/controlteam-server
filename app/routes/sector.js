module.exports = (app) => {
    var APIsector = app.api.sector(app);

    app.route("/sector")
    .get(APIsector.get)
    .post(APIsector.insert);

    app.route("/sector/:id")
    .get(APIsector.getById)
    .put(APIsector.update)
    .delete(APIsector.delete);

    app.route("/sector/company/:id")
    .get(APIsector.getByCompany);
}