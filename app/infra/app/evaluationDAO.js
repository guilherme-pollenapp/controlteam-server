var objectId = require("mongodb").ObjectId;

module.exports = () => {
    return () => {
        let date = new Date();
        date.setHours(0,0,0,0);
        date.setDate(date.getDate()-1)
        
        this.findPending = (db,id) => new Promise((resolve,reject) => {
            db.collection("evaluations").find({
                "evaluted": { $in : [id]},
                "answers": { $elemMatch: { "evaluted": id, "evalutedAnswer.questions": null }},
                "deadline": { $gte: date  }
            },{
                fields: {
                    title: 1,
                    introduction: 1,
                    deadline: 1
                }
            }).toArray((err,doc) => {
                if(err)
                    return reject(err);
                return resolve(doc);
            })
        });

        this.findEvaluation = (db,id) => new Promise((resolve,reject) => {
            db.collection("evaluations").find({
                _id: new objectId(id)
            },{
                fields: {
                    title: 1,
                    questions:1,
                    company: 1,
                    deadline: 1
                }
            }).toArray((err,doc) => {
                if(err)
                    return reject(err);
                return resolve(doc);
            })
        })

        this.findDone = (db, id) => new Promise((resolve, reject) => {
            db.collection("evaluations").find({
                "evaluted": { $in: [id] },
                "answers": { $elemMatch: { "evaluted": id, "evalutedAnswer.questions": {$ne: null} } }
            }, {
                    fields: {
                        title: 1,
                        introduction: 1,
                        deadline: 1
                    }
                }).toArray((err, doc) => {
                    if (err)
                        return reject(err);
                    return resolve(doc);
                })
        });

        this.findHistoric = (db, id) => new Promise((resolve, reject) => {
            db.collection("evaluations").find({
                "evaluted": { $in: [id] }
            }, {
                    fields: {
                        title: 1,
                        introduction: 1,
                        deadline: 1,
                        "answers.evalutedAnswer.date": 1
                    }
                }).toArray((err, doc) => {
                    if (err)
                        return reject(err);
                    return resolve(doc);
                })
        });

        this.update = (db, id, user, data) => new Promise((resolve, reject) => {
            console.log("user: "+user+", id: "+id);

            db.collection("evaluations").update({
                "_id": new objectId(id),
                "answers": { $elemMatch: { "evaluted": user } },
            }, {
                $set: {
                    "answers.$.evalutedAnswer.questions": data.question,
                    "answers.$.evalutedAnswer.date": new Date()
                }    
            },(err,doc) => {
                if(err)
                    return reject(err);
                return resolve(doc);
            })
        });

        return this;
    }
}