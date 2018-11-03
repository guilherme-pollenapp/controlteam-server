module.exports = (app) => {
    return () => {

        this.getPending = (req,res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationEvaluterDAO();

                let id = req.params.id;

                DAO.findPending(db,id).then(result => {
                    res.json(result);
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        this.getDone = (req,res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationEvaluterDAO();

                let id = req.params.id;

                DAO.findDone(db,id).then(result => {
                    res.json(result);
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        this.getHistoric = (req,res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationEvaluterDAO();

                let id = req.params.id;

                DAO.findHistoric(db,id).then(result => {
                    res.json(result);
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        return this;
    }
}