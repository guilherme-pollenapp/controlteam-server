module.exports = (app) => {
    return () => {
        this.get = (req,res) => {
            var con = app.infra.mysqlFactory;
            var sectorDAO = app.infra.sectorDAO(con);

            sectorDAO.listSectors().then((sectors) => {

                res.send(sectors);
                
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getById = (req,res) => {
            var con = app.infra.mysqlFactory;
            var sectorDAO = app.infra.sectorDAO(con);

            var id = req.params.id;
            id = id.split("|");

            sectorDAO.listSectorsById(id).then((sectors) => {

                res.send(sectors);
                
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.getByCompany = (req,res) => {
            var con = app.infra.mysqlFactory;
            var sectorDAO = app.infra.sectorDAO(con);

            var id = req.params.id;
            id = id.split("|");

            sectorDAO.listSectorsByCompany(id).then((sectors) => {

                res.send(sectors);
                
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.insert = (req,res) => {
            var con = app.infra.mysqlFactory;
            var sectorDAO = app.infra.sectorDAO(con);

            var data = req.body;

            sectorDAO.insertSector(data).then((sector) => {

                res.send(sector);
                
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.update = (req,res) => {
            var con = app.infra.mysqlFactory;
            var sectorDAO = app.infra.sectorDAO(con);

            var id = req.params.id;
            var data = req.body;

            sectorDAO.updateSector(id,data).then((sectors) => {

                res.send(sectors);
                
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        this.delete = (req,res) => {
            var con = app.infra.mysqlFactory;
            var sectorDAO = app.infra.sectorDAO(con);

            var id = req.params.id;
            
            sectorDAO.deleteSector(id).then((sectors) => {

                res.send(sectors);
                
            }, err => {
                console.log(err);
                res.send(err.sqlMessage);
            });
        }

        return this;
    }
}