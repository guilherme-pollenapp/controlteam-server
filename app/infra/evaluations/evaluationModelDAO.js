var ObjectId = require("mongodb").ObjectId;

module.exports = () => {
    return () => {

        this.findModels = (db) => new Promise((resolve, reject) => {
            db.collection("modelEvaluation").find({
                "company": { "$exists": false }
            }, {
                    fields: {
                        title: 1,
                        description: 1
                    }
                }).toArray((err, doc) => {
                    if (err)
                        return reject(err);
                    return resolve(doc);
                })
        })

        this.findCompleteModels = (db, id) => new Promise((resolve, reject) => {
            db.collection("modelEvaluation").find({
                "_id" : new ObjectId(id)
            }).toArray((err, doc) => {
                if (err)
                    return reject(err);
                return resolve(doc);
            })
        })

        this.findModelsByCompany = (db,id) => new Promise((resolve, reject) => {
            db.collection("modelEvaluation").find({
                "company": new ObjectId(id)
            }, {
                    fields: {
                        title: 1,
                        description: 1
                    }
                }).toArray((err, doc) => {
                    if (err)
                        return reject(err);
                    return resolve(doc);
                })
        })

        this.insert = (db, data) => new Promise((resolve, reject) => {
            db.collection("modelEvaluation")
            .insert(data, (err, doc) => {
                if (err)
                    return reject(err);
                return resolve(doc);
            })
        })

        this.update = (db, id,data) => new Promise((resolve, reject) => {
            db.collection("modelEvaluation").update({
                "_id": new ObjectId(id)
            },{
                $set: {
                    data
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