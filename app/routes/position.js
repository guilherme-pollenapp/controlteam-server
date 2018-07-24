module.exports = (app) => {
    var APIposition = app.api.position(app);

    app.route("/position")
    .get(APIposition.get)
    .post(APIposition.post);

    app.route("/position/:id")
    .get(APIposition.getByPositions)
    .put(APIposition.update)
    .delete(APIposition.delete)

    app.route("/position/sector/:id")
    .get(APIposition.getBySector);

    app.route("/position/company/:id")
    .get(APIposition.getByCompany);

    app.route("/position/company/:company/sector/:sector")
    .get(APIposition.getByCompanyAndSector);
}