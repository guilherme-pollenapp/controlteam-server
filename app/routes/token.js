module.exports = (app) => {
	var APIauth = app.api.auth(app);

	app.use("/*", APIauth.token);

}	