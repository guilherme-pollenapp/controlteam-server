module.exports = (app) => {
    return () => {

        this.getPending = async (req, res) => {
            app.infra.connectionFactory.then(async db => {
                let DAO = app.infra.app.evaluationEvaluterDAO(app);

                const con = app.infra.mysqlFactory;
                const employee = app.infra.employeeDAO(con);

                let id = req.params.id;

                try {
                    const result = await DAO.findPending(db, id)

                    const promises = [];
                    result.forEach(item => {
                        promises.push(employee.getName(item.evaluted));
                    })

                    const users = await Promise.all(promises);
                    console.log(users);

                    result.map(item => {
                        const user = users.filter(user => user[0].id_user == item.evaluted);

                        item.evalutedName = user[0][0].firstname_user + ' ' + user[0][0].lastname_user;
                    })

                    res.json(result);
                }
                catch (err) {
                    console.log(err);
                }
            })
        }

        this.getDone = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationEvaluterDAO(app);

                let id = req.params.id;

                DAO.findDone(db, id).then(result => {
                    res.json(result);
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        this.getHistoric = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationEvaluterDAO(app);

                let id = req.params.id;

                DAO.findHistoric(db, id).then(result => {
                    res.json(result);
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        this.update = (req, res) => {
            app.infra.connectionFactory.then(db => {
                let DAO = app.infra.app.evaluationEvaluterDAO();

                let id = req.params.id;
                let evaluter = req.params.evaluter;
                let evaluted = req.params.evaluted;
                let position = req.params.position;

                let data = req.body;

                DAO.update(db, id, evaluted, evaluter, position, data).then(result => {
                    res.json(result);
                }).catch(err => {
                    console.log(err);
                })
            })
        }

        this.findConsense = async (req, res) => {
            try {
                let DAO = app.infra.app.evaluationEvaluterDAO(app);

                const con = app.infra.mysqlFactory;
                const employee = app.infra.employeeDAO(con);

                let id = req.params.id;

                try {
                    const result = await DAO.findPending(db, id)

                    const promises = [];
                    result.forEach(item => {
                        promises.push(employee.getName(item.evaluted));
                    })

                    const users = await Promise.all(promises);

                    result.map(item => {
                        const user = users.filter(user => user[0].id_user == item.evaluted);

                        item.evalutedName = user[0][0].firstname_user + ' ' + user[0][0].lastname_user;
                    })

                    res.json(result);
                }
                catch (err) {
                    res.send(err);
                    console.log(err);
                }
            }
            catch (err) {
                res.send(err)
                console.log(err)
            }
        }

        return this;
    }
}