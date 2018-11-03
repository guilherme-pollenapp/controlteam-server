module.exports = (app) => {
	var APIuser = app.api.user(app);

	app.route("/user")
		.get(APIuser.list)
		.post(APIuser.insert);

	app.route("/user/verify/:cpf")
		.get(APIuser.exists);

	app.route("/user/:id")
		.get(APIuser.getByUser)
		.put(APIuser.update);
}