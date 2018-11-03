module.exports = (app) => {
    return () => {

        this.getHistoric = (req,res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationDAO();

                let id = req.params.id;

                DAO.findHistoric(db, id).then(result => {
                    res.json(result);
                })
            })
        }

        this.getPending = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationDAO();

                let id = req.params.id;

                DAO.findPending(db,id).then(result => {
                    res.json(result);
                })
            })
        }

        this.getDone = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationDAO();

                let id = req.params.id;

                DAO.findDone(db, id).then(result => {
                    res.json(result);
                })
            })
        }

        this.getEvaluation = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationDAO();

                let id = req.params.id;

                DAO.findEvaluation(db, id).then(result => {
                    res.json(result);
                })
            })
        }

        this.update = (req,res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationDAO();

                let id = req.params.id;
                let user = req.params.user.toString();
                let data = req.body;

                data.date = new Date(data.date);


                DAO.update(db,id,user,data).then(result => {
                    res.send(result);
                })
                .catch(err => console.log(err));
            })
        }

        return this;
    }
}