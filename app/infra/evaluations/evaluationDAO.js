var ObjectId = require("mongodb").ObjectId;

module.exports = () => {
    return () => {

        this.add = (db, data) => new Promise((resolve, reject) => {
            db.collection("evaluations").insert(data, (err, doc) => {
                if (err)
                    return reject(err);
                return resolve(doc);
            })
        })

        this.updateEvaluations = (db, idEv, id) => new Promise((resolve, reject) => {
            db.collection("company").update({
                _id: new ObjectId(id)
            }, {
                    $push: {
                        evaluations: new ObjectId(idEv)
                    }
                }, (err, doc) => {
                    if (err)
                        return reject(err);
                    return resolve(doc);
                })
        })

        this.findEvaluation = (db, id) => new Promise((resolve, reject) => {
            db.collection("evaluations").find({
                "_id": new ObjectId(id)
            }).toArray((err, doc) => {
                if (err)
                    return reject(err);
                return resolve(doc);
            })
        })

        this.findEvaluationByEvaluter = (db, id) => new Promise((resolve, reject) => {
            db.collection("evaluations").find({
                "evaluter": { $in: [id] }
            },{
                fields: {
                    title: 1,
                    deadline: 1,
                    evaluted: 1
                }
            }).toArray((err, doc) => {
                if (err)
                    return reject(err);
                return resolve(doc);
            })
        })

        this.findEvaluationByEvaluter = (db, id) => new Promise((resolve, reject) => {
            db.collection("evaluations").find({
                "evaluted": { $in: [id] },
                "answers": { $elemMatch: { evaluted: id }}
            }, {
                    fields: {
                        title: 1,
                        deadline: 1,
                        answers: 1,
                        "answers.$.evaluted": 1
                    }
                }).toArray((err, doc) => {
                    if (err)
                        return reject(err);
                    return resolve(doc);
                })
        })

        this.findEvaluationByCompany = (db, id) => new Promise((resolve, reject) => {
            db.collection("company").aggregate([
                {
                    "$match": {
                        "_id": new ObjectId(id)
                    }
                },
                {
                    "$unwind": "$evaluations"
                },
                {
                    "$lookup": {
                        "from": "evaluations",
                        "localField": "evaluations",
                        "foreignField": "_id",
                        "as": "evaluationCompany"
                    }
                },
                {
                    "$unwind": "$evaluationCompany"
                },
                {
                    "$group": {
                        "_id": "$_id",
                        "evaluations": {
                            "$push": "$evaluations"
                        },
                        "evaluationCompany": {
                            "$push": "$evaluationCompany"
                        }
                    }
                }
            ]).toArray((err, docs) => {
                if (err)
                    return reject(err);
                return resolve(docs);
            })
        })

        this.findEvaluationByCompanySimple = (db, id) => new Promise((resolve, reject) => {
            db.collection("company").aggregate([
                {
                    "$match": {
                        "_id": new ObjectId(id)
                    }
                },
                {
                    "$unwind": "$evaluations"
                },
                {
                    "$lookup": {
                        "from": "evaluations",
                        "localField": "evaluations",
                        "foreignField": "_id",
                        "as": "evaluationCompany"
                    }
                },
                {
                    "$unwind": "$evaluationCompany"
                },
                {
                    "$group": {
                        "_id": "$_id",
                        "evaluations": {
                            "$push": "$evaluations"
                        },
                        "evaluationCompany": {
                            "$push": {
                                _id: "$evaluationCompany._id",
                                title: "$evaluationCompany.title",
                                deadline: "$evaluationCompany.deadline",
                                company: "$evaluationCompany.company"

                            }
                        }
                    }
                }
            ]).toArray((err, docs) => {
                if (err)
                    return reject(err);
                return resolve(docs);
            })
        })

        return this;
    }
}