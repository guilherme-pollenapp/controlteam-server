module.exports = (app) => {
    return () => {
        this.get = (req,res) => {
            var con = app.infra.mysqlFactory;
            var employee = app.infra.employeeDAO(con);

            employee.listEmployees().then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByEmployee = (req, res) => {
            var con = app.infra.mysqlFactory;
            var employee = app.infra.employeeDAO(con);

            var ids = req.params.id;
            console.log(ids);

            employee.listEmployeesByEmployee(ids.split("|")).then(result => {
                res.json(result)
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByCompany = (req,res) => {
            var con = app.infra.mysqlFactory;
            var employee = app.infra.employeeDAO(con);

            var ids = req.params.id;

            employee.listEmployeesByCompany(ids.split("|")).then(result => {
                res.json(result)
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByFunction = (req,res) => {
            var con = app.infra.mysqlFactory;
            var employee = app.infra.employeeDAO(con);

            var ids = req.params.id;

            employee.listEmployeesByFunction(ids.split("|")).then(result => {
                res.json(result);
            })
        }

        this.insert = (req,res) => {
            var con = app.infra.mysqlFactory;
            var employee = app.infra.employeeDAO(con);

            var data = req.body;

            employee.insert(data).then(result => {
                res.json(data)
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.update = (req,res) => {
            var con = app.infra.mysqlFactory;
            var employee = app.infra.employeeDAO(con);

            var data = req.body;
            var id = req.params.id;
            var company = req.params.id_company;

            employee.update(id,company,data).then(result => {
                res.json(result)
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.delete = (req, res) => {
            var con = app.infra.mysqlFactory;
            var employee = app.infra.employeeDAO(con);

            var id = req.params.id;
            var company = req.params.id_company;

            employee.delete(id, company).then(result => {
                res.json(result)
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        return this;
    }
}