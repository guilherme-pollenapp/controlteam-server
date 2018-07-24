module.exports = (app) => {
	var APIauth = app.api.auth(app);

	app.route("/auth")
	.post(APIauth.auth);
}		