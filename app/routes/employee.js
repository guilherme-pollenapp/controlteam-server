module.exports = (app) => {
    var employee = app.api.employee(app);
    
    app.route("/employee")
    .get(employee.get)
    .post(employee.insert);

    app.route("/employee/:id")
    .get(employee.getByEmployee);
    

    app.route("/employee/:id/company/:id_company")
    .put(employee.update)
    .delete(employee.delete);

    app.route("/employee/company/:id")
    .get(employee.getByCompany);

    app.route("/employee/function/:id")
    .get(employee.getByFunction);
}