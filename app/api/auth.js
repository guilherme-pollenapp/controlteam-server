var jwt = require('jsonwebtoken');

module.exports = (app) => {
    return () => {

        this.auth = (req,res) => {
            app.infra.connectionFactory.then(db => {
				var a = app.infra.authDAO();
				var c = app.util.crypto();

				var email = req.body.email;
				var password = c.pass(req.body.password);

				a.login(db,email,password).then(result => {
					//criar token
					var token = jwt.sign({email:email},app.get('secret'),{
						expiresIn:84600
					});
					if(result.length > 0)
						result[0].token = token;
					res.json(result);
				}, err => {
					console.log(err);
					res.send(err.sqlMessage);
				});
			})
		}

		this.authAPP = (req, res) => {
			var con = app.infra.mysqlFactory;
			var auth = app.infra.authDAO();

			let data = req.body;

			auth.authAPP(con,data).then((result) => {
				var token = jwt.sign({ cpf: data.cpf }, app.get('secret'), {
					expiresIn: 84600
				});

				if (result.length > 0){
					result[0].token = token;
					res.json(result);
				}
				else {
					res.status(500).send(result);
				}

			}).catch(err => {
				res.send(err);
			})
		}
		
		this.token = (req,res,next) => {
			let token = req.headers['x-access-token'];
            jwt.verify(token,app.get('secret'),(error,decode) => {
                if(error){
                    res.sendStatus(401);
                }

                next();
			});	
		}


        return this;
    }
}