module.exports = (app) => {
    return () => {
        this.get = (req,res) => {
            var con = app.infra.mysqlFactory;
            var func = app.infra.functionDAO(con);

            func.listFunctions().then(result => {
                res.json(result)
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByCompany = (req,res) => {
            var con = app.infra.mysqlFactory;
            var func = app.infra.functionDAO(con);

            var id = req.params.id;

            func.listFunctionsByCompany(id.split("|")).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getBySector = (req,res) => {
            var con = app.infra.mysqlFactory;
            var func = app.infra.functionDAO(con);

            var id = req.params.id;

            func.listFunctionsBySector(id.split("|")).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByPosition = (req,res) => {
            var con = app.infra.mysqlFactory;
            var func = app.infra.functionDAO(con);

            var id = req.params.id;

            func.listFunctionsByPosition(id.split("|")).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByFunctions = (req,res) => {
            var con = app.infra.mysqlFactory;
            var func = app.infra.functionDAO(con);

            var id = req.params.id;

            func.listFunctionsByFunctions(id.split("|")).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.insert = (req,res) => {
            var con = app.infra.mysqlFactory;
            var func = app.infra.functionDAO(con);

            var data = req.body;

            func.insert(data).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.update = (req,res) => {
            var con = app.infra.mysqlFactory;
            var func = app.infra.functionDAO(con);

            var id = req.params.id;
            var data = req.body;

            func.update(id,data).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.delete = (req,res) => {
            var con = app.infra.mysqlFactory;
            var func = app.infra.functionDAO(con);

            var id = req.params.id;

            func.delete(id).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        return this;
    }
}