var ObjectId = require("mongodb").ObjectId;

module.exports = (app) => {
    return () => {

        this.findModels = (req,res) => {
            app.infra.connectionFactory.then(db => {
                var modelDAO = app.infra.evaluations.evaluationModelDAO();

                modelDAO.findModels(db).then(result => {
                    res.json(result);
                })
            })          
        }

        this.findModelsById = (req,res) => {
            app.infra.connectionFactory.then(db => {
                var modelDAO = app.infra.evaluations.evaluationModelDAO();
                var id = req.params.id;

                modelDAO.findCompleteModels(db,id).then(result => {
                    res.json(result);
                })
            }) 
        }

        this.findModelsByCompany = (req, res) => {
            app.infra.connectionFactory.then(db => {
                var modelDAO = app.infra.evaluations.evaluationModelDAO();
                var id = req.params.id;

                modelDAO.findModelsByCompany(db, id).then(result => {
                    res.json(result);
                })
            })
        }

        this.insert = (req,res) => {
            app.infra.connectionFactory.then(db => {
                var modelDAO = app.infra.evaluations.evaluationModelDAO();
                var data = req.body;

                if(data.company){
                    data.company = new ObjectId(data.company);
                }

                modelDAO.insert(db, data).then(result => {
                    res.json(result);
                })
            }) 
        }

        this.update = (req, res) => {
            app.infra.connectionFactory.then(db => {
                var modelDAO = app.infra.evaluations.evaluationModelDAO();
                var data = req.body;
                var id = req.params.id;

                modelDAO.update(db, id, data).then(result => {
                    res.json(result);
                })
            })
        }

        return this;
    }
}