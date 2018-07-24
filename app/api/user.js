module.exports = (app) => {
	return () => {
		this.insert = (req,res) => {
			var con = app.infra.mysqlFactory;
			var user = app.infra.userDAO(con);
			
			var data = req.body;

            user.insert(data).then(result => {
                res.json(result.insertId);
            },err => {
				console.log(err);
				res.send(err.sqlMessage);
			});
		}

		this.update = (req,res) => {
			var con = app.infra.mysqlFactory;
			var user = app.infra.userDAO(con);
			
			var id = req.params.id;
			var data = req.body;

			user.update(id,data).then(result => {
                res.json(result);
			}, err => {
				console.log(err);
				res.send(err.sqlMessage);
			});
		}

		this.list = (req,res) => {
			var con = app.infra.mysqlFactory;
			var user = app.infra.userDAO(con);

			user.listUsers().then(result => {
				res.json(result);
			}, err => {
				console.log(err);
				res.send(err.sqlMessage);
			});
		}

		this.getByUser = (req, res) => {
			var con = app.infra.mysqlFactory;
			var user = app.infra.userDAO(con);

			var id = req.params.id;

			user.listById(id).then(result => {
				res.json(result);
			}, err => {
				console.log(err);
				res.send(err.sqlMessage);
			});
		}

		this.exists = (req, res) => {
			var con = app.infra.mysqlFactory;
			var user = app.infra.userDAO(con);

			var cpf = req.params.cpf;

			user.userExists(cpf).then(result => {
				if(result.length > 0){
					res.json(result[0].id_user);
				} else {
					res.status(500).send("user not exists");
				}
			}, err => {
				console.log(err);
				res.send(err.sqlMessage);
			});
		}

		return this;
	}
}