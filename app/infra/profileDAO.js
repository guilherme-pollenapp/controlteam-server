var objectId = require("mongodb").ObjectId;

module.exports = () => {
    return () => {

        this.listProfile = (db, id) => new Promise((resolve, reject) => {
            db.collection("company").find({
                "_id": new objectId(id)
            }, {
                    fields: {
                        users: 1,
                        "users._id": 1,
                        "users.name": 1,
                        "users.email": 1
                    }
                }).toArray((err, doc) => {
                    if (err)
                        return reject(err);
                    return resolve(doc);
                })
        })

        this.insert = (db, id, data) => new Promise((resolve, reject) => {
            db.collection("company").update({
                _id: new objectId(id)
            },
                {
                    $push: {
                        users: {
                            _id: new objectId(),
                            name: data.name,
                            email: data.email,
                            password: data.password
                        }
                    }
                },
                (err, doc) => {
                    if (err)
                        return reject(err);

                    return resolve(doc);
                })
        })

        this.findInsert = (db, id, email) => new Promise((resolve, reject) => {
            db.collection("company").find({
                "users.email":email
            }, {
                fields: {
                    "users.$._id": 1
                }
            }).toArray((err, doc) => {
                return resolve(doc);
            })
        })

        this.update = (db, company, user, data) => new Promise((resolve, reject) => {
            db.collection("company").update({
                _id: new objectId(company),
                users: { $elemMatch: { _id: new objectId(user) } }
            }, {
                    $set: {
                        "users.$.name": data.name,
                        "users.$.email": data.email
                    }
                }, (err, doc) => {
                    if (err)
                        return reject(err);

                    return resolve(doc);
                })
        })

        this.updatePassword = (db, company, user, data) => new Promise((resolve, reject) => {
            db.collection("company").update({
                _id: new objectId(company),
                users: { $elemMatch: { _id: new objectId(user) } }
            }, {
                    $set: {
                        "users.$.password": data
                    }
                }, (err, doc) => {
                    if (err)
                        return reject(err);

                    return resolve(doc);
                })
        })

        this.delete = (db, company, user) => new Promise((resolve, reject) => {
            db.collection("company").update({
                _id: new objectId(company)
            }, {
                    $pull: {
                        "users" : { "_id" : new objectId(user) }
                    }
                }, (err, doc) => {
                    if (err)
                        return reject(err);

                    return resolve(doc);
                })
        })

        return this;
    }
}