module.exports = (app) => {
    return () => {

        this.get = (req,res) => {
            var con = app.infra.mysqlFactory;

            var companyDAO = app.infra.companyDAO(con);

            companyDAO.listCompany().then((resolve) => {
                res.json(resolve);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });

        }

        this.cnpj = (req, res) => {
            var con = app.infra.mysqlFactory;
            var companyDAO = app.infra.companyDAO(con);

            var cnpj = req.params.cnpj;

            companyDAO.verifyCNPJ(cnpj).then((resolve) => {
                res.json(resolve);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });

        }

        this.getById = (req,res) => {
            var con = app.infra.mysqlFactory;

            var companyDAO = app.infra.companyDAO(con);

            var id = req.params.id;
            id = id.split("|");

            companyDAO.listCompanyRh(id).then((resolve) => {
                res.json(resolve);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.insert = (req,res) => {
            var con = app.infra.mysqlFactory;
            var companyDAO = app.infra.companyDAO(con);
            var data = req.body;

            var id = req.params.id;

            companyDAO.insertCompany(data).then((result) => {
                app.infra.connectionFactory.then(db => {
                    companyDAO.updateCompanyMongo(db,id,result.insertId).then(r => {
                        res.json(result);
                    })
                })
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.update = (req,res) => {
            var con = app.infra.mysqlFactory;
            var companyDAO = app.infra.companyDAO(con);

            var id = req.params.id;
            var data = req.body;

            companyDAO.updateCompany(id,data).then((result) => {
                
                res.json(result);

            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.delete = (req,res) => {
            var con = app.infra.mysqlFactory;
            var companyDAO = app.infra.companyDAO(con);

            var id = req.params.id;

            companyDAO.deleteCompany(id).then((result) => {
                
                res.json(result);

            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        } 

        return this;
    }
}