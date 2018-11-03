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
		
		this.authAPP = (con,data) => new Promise((resolve,reject) => {
			con.query(`
				select user.id_user,user.firstname_user,user.lastname_user,user.email_user,company.id_company,company.name_company from employee_company 
				INNER JOIN user on employee_company.id_user = user.id_user
				INNER JOIN company on company.id_company = employee_company.id_company
				where cpf_user=? and birth_user=?
			`,[
				data.cpf,data.birth
			],(err,result) => {
				if(err)
					return reject(err)
				return resolve(result);
			})
		})

        return this;
    }
}