var crypto = require("crypto-js");
var objectId = require("mongodb").ObjectId;

module.exports = (app) => {
    return () => {

        this.get = (req,res) => {
            app.infra.connectionFactory.then(db => {

                var profile = app.infra.profileDAO();

                var id = req.params.id;

                profile.listProfile(db,id).then(resolve => {
                    res.send(resolve);
                })

            })
        }

        this.insert = (req, res) => {
            app.infra.connectionFactory.then(db => {

                var profile = app.infra.profileDAO();

                var id = req.params.id;
                var data = req.body;

                data.password = crypto.SHA512("admin", app.get('secret')).toString();

                profile.insert(db, id, data).then(resolve => {
                    profile.findInsert(db,id,data.email).then(r => {
                        res.send(r[0].users[0]);
                    })
                })

            })
        }

        this.update = (req, res) => {
            app.infra.connectionFactory.then(db => {

                var profile = app.infra.profileDAO();

                var id = req.params.id;
                var user = req.params.user;
                var data = req.body;

                profile.update(db, id, user,data).then(resolve => {
                    res.send(resolve);
                })

            })
        }

        this.updatePassword = (req, res) => {
            app.infra.connectionFactory.then(db => {

                var profile = app.infra.profileDAO();

                var id = req.params.id;
                var user = req.params.user;

                var c = app.util.crypto();
                var data = c.pass(req.body.password);

                profile.updatePassword(db, id, user, data).then(resolve => {
                    res.send(resolve);
                })

            })
        }

        this.delete = (req, res) => {
            app.infra.connectionFactory.then(db => {

                var profile = app.infra.profileDAO();

                var id = req.params.id;
                var user = req.params.user;

                profile.delete(db, id, user).then(resolve => {
                    res.send(resolve);
                })

            })
        }

        return this;
    }
}