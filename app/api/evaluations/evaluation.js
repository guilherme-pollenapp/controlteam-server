module.exports = (app) => {
    return () => {

        this.getByCompany = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let evaluationDAO = app.infra.evaluations.evaluationDAO();
                let con = app.infra.mysqlFactory;
                let companyDAO = app.infra.companyDAO(con);

                let id = req.params.id;

                evaluationDAO.findEvaluationByCompanySimple(db, id).then(result => {
                    if (result[0].evaluationCompany) {
                        let ids = result[0].evaluationCompany.reduce((prev, val) => prev.concat(val.company), []);
                        companyDAO.listCompanyRh(ids).then(comp => {
                            result[0].evaluationCompany.map(item => {
                                item.company = comp.filter(c => c.id_company == item.company)[0].name_company
                            })

                            res.json(result);
                        })
                    } else {
                        res.json(result);
                    }
                })
            })
        }

        this.getByEvaluation = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let evaluationDAO = app.infra.evaluations.evaluationDAO();

                var id = req.params.id;
                
                if(id){
                    evaluationDAO.findEvaluation(db, id).then(result => {
                        res.json(result);
                    })
                } else {
                    res.json({});
                }
            })
        }

        this.getByEvaluter = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let evaluationDAO = app.infra.evaluations.evaluationDAO();

                var id = req.params.id;

                evaluationDAO.findEvaluationByEvaluter(db,id).then(result => {
                    res.json(result);
                })
            })
        }

        this.getByEvaluted = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let evaluationDAO = app.infra.evaluations.evaluationDAO();

                var id = req.params.id;

                evaluationDAO.findEvaluationByEvaluter(db, id).then(result => {
                    res.json(result);
                })
            })
        }

        this.insert = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let evaluationDAO = app.infra.evaluations.evaluationDAO();

                let data = req.body;
                let id = req.params.id;

                data.deadline = new Date(data.deadline);

                if(data.ev_i1){
                    data.answers = data.evaluted.map(item => 
                        item = {
                            evaluted: item,
                            evalutedAnswer: {
                                questions: null,
                                date: null
                            },
                            evaluterAnswer: data.evaluter.map(ev => 
                                ev = {
                                    evaluter: ev,
                                    questions: null,
                                    date: null
                            })
                        }
                    )
                }

                evaluationDAO.add(db, data).then(resolve => {
                    evaluationDAO.updateEvaluations(db, resolve.insertedIds[0], id).then((result) => {
                        res.json(result);
                    })
                })
            })
        }

        return this;
    }
}	