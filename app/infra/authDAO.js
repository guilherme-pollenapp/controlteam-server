module.exports = () => {
    return () => {
        this.login = (db,user,password) => {
            return new Promise((resolve,reject) => {
                db.collection("company").find({
					"users": {$elemMatch:{
						"email":user,
						"password":password
					}}
				}).toArray((err, docs) => {
					if(err)
						return reject(err)
					return resolve(docs);
				})
            })
        }

        return this;
    }
}