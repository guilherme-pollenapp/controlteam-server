module.exports = app => {
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
                                //"evaluterAnswer.questions": { $ne: null }
                            }
                        }
                    }
                },
                "consense": {
                    $elemMatch: {
                        evaluter: id,
                        active: false
                    }
                },
                "deadline": { $gte: date }
            }).toArray((err,doc) => {
                if (err)
                    return reject(err);
                
                if (!doc[0])
                    return resolve(doc);
                
                const data = doc.map(evaluation => 
                    evaluation.consense.map(consense => {
                        return {
                            _id: evaluation._id,
                            title: evaluation.title,
                            introduction: evaluation.introduction,
                            deadline: evaluation.deadline,
                            evaluted: consense.evaluted,
                            evalutedName: "user"
                        }
                    })
                )

                return resolve(data)
            })
        })

        return this
    }
}