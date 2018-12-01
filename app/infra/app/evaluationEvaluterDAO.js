const objectId = require("mongodb").ObjectId

module.exports = (app) => {
    return () => {
        let date = new Date();
        date.setHours(0, 0, 0, 0);
        date.setDate(date.getDate() - 1)

        this.findPending = async (db, id) => new Promise((resolve, reject) => {

            db.collection("evaluations").find({
                "evaluter": { $in: [id] },
                "answers": {
                    $elemMatch: {
                        "evaluterAnswer": {
                            $elemMatch: {
                                "evaluter": id,
                                "evaluterAnswer.questions": null
                            }
                        }
                    }
                },
                "deadline": { $gte: date }
            }).toArray((err, doc) => {
                if (err)
                    return reject(err);

                let data = [];

                if (!doc[0])
                    return resolve(doc);

                doc.forEach(async evaluation => {
                    evaluation.answers.forEach(async answers => {
                        answers.evaluterAnswer.forEach(async evaluterAnswer => {
                            if (evaluterAnswer.evaluter == id && evaluterAnswer.questions == null) {

                                data.push({
                                    _id: evaluation._id,
                                    title: evaluation.title,
                                    introduction: evaluation.introduction,
                                    deadline: evaluation.deadline,
                                    evaluted: answers.evaluted,
                                    evalutedName: "user"
                                })
                            }
                        })
                    })
                })

                return resolve(data);
            })
        })

        this.findDone = (db, id) => new Promise((resolve, reject) => {
            db.collection("evaluations").find({
                "evaluter": { $in: [id] },
                "answers": {
                    $elemMatch: {
                        "evaluterAnswer": {
                            $elemMatch: {
                                "evaluter": id,
                                "evaluterAnswer.questions": { $ne: null }
                            }
                        }
                    }
                }
            }).toArray((err, doc) => {
                if (err)
                    return reject(err);
                let data = [];

                if (!doc[0])
                    return resolve(doc);

                doc.forEach(evaluation => {
                    evaluation.answers.forEach(answers => {
                        answers.evaluterAnswer.forEach(evaluterAnswer => {
                            if (evaluterAnswer.evaluter == id && evaluterAnswer.questions == null) {
                                data.push({
                                    _id: evaluation._id,
                                    title: evaluation.title,
                                    introduction: evaluation.introduction,
                                    deadline: evaluation.deadline,
                                    evaluted: answers.evaluted
                                })
                            }
                        })
                    })
                })

                return resolve(data);
            })
        })

        this.findHistoric = (db, id) => new Promise((resolve, reject) => {
            db.collection("evaluations").find({
                "evaluter": { $in: [id] },
                "answers": {
                    $elemMatch: {
                        "evaluterAnswer": {
                            $elemMatch: {
                                "evaluter": id
                            }
                        }
                    }
                }
            }).toArray((err, doc) => {
                if (err)
                    return reject(err);

                let data = [];

                if (!doc[0])
                    return resolve(doc);

                doc.forEach(evaluation => {
                    evaluation.answers.forEach(answers => {
                        answers.evaluterAnswer.forEach(evaluterAnswer => {
                            if (evaluterAnswer.evaluter == id && evaluterAnswer.questions == null) {
                                data.push({
                                    _id: evaluation._id,
                                    title: evaluation.title,
                                    introduction: evaluation.introduction,
                                    deadline: evaluation.deadline,
                                    evaluted: answers.evaluted
                                })
                            }
                        })
                    })
                })

                return resolve(data);
            })
        })

        this.update = (db, id, evaluted, evaluter, position, data) => new Promise((resolve, reject) => {

            let d = {}

            console.log(data)

            d["answers.$.evaluterAnswer." + position + ".questions"] = data.question
            d["answers.$.evaluterAnswer." + position + ".date"] = new Date()

            db.collection("evaluations").updateOne({
                "_id": new objectId(id),
                "answers": {
                    $elemMatch: {
                        "evaluted": evaluted,
                        "evaluterAnswer": {
                            $elemMatch: {
                                "evaluter": evaluter
                            }
                        }
                    }
                },
            }, {
                    $set: d
                }, (err, doc) => {
                    if (err)
                        return reject(err);
                    return resolve(doc);
                })
        })

        return this;
    }
}