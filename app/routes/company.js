var ObjectId = require("mongodb").ObjectId;

module.exports = (app)=>{

    var APIcompany = app.api.company(app);

    app.route("/company")
    .get(APIcompany.get);

    app.route("/company/:id")
    .post(APIcompany.insert)
    .get(APIcompany.getById)
    .put(APIcompany.update)
    .delete(APIcompany.delete);

    app.route("/company/cnpj/:cnpj")
    .get(APIcompany.cnpj);
}