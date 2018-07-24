module.exports = (app) => {
    return () => {
        this.get = (req,res) => {
            var con = app.infra.mysqlFactory;
            var position = app.infra.positionDAO(con);

            position.listPositions().then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByPositions = (req,res) => {
            var con = app.infra.mysqlFactory;
            var position = app.infra.positionDAO(con);

            var p = req.params.id;

            position.listPositionsById(p.split("|")).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getBySector = (req,res) => {
            var con = app.infra.mysqlFactory;
            var position = app.infra.positionDAO(con);

            var s = req.params.id;

            position.listPositionsBySector(s.split("|")).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByCompany = (req,res) => {
            var con = app.infra.mysqlFactory;
            var position = app.infra.positionDAO(con);

            var c = req.params.id;

            position.listPositionsByCompany(c.split("|")).then(result => {
                res.json(result);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByCompanyAndSector = (req,res) => {
            var con = app.infra.mysqlFactory;
            var position = app.infra.positionDAO(con);

            var c = req.params.company;
            var s = req.params.sector;

            position.listPositionsBySectorAndCompany(
                c.split("|"),
                s.split("|")
            ).then(result => {

                res.json(result);
                
                }, err => {
                    console.log(err);
                    res.send(err.sqlMessage);
                });
        }

        this.post = (req,res) => {
            var con = app.infra.mysqlFactory;
            var data = req.body;
            var position = app.infra.positionDAO(con);

            position.insert(data).then(response => {
                res.json(response);
            },err => {
                console.log(err);
            })
        }

        this.update = (req,res) => {
            var con = app.infra.mysqlFactory;
            var id  = req.params.id;
            var data = req.body;

            var position = app.infra.positionDAO(con);

            position.update(id,data).then(response => {
                res.json(response);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.delete = (req,res) => {
            var con = app.infra.mysqlFactory;
            var id  = req.params.id;

            var position = app.infra.positionDAO(con);

            position.delete(id).then(response => {
                res.json(response);
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        return this;
    }
}