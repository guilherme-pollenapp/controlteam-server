module.exports = (app) => {

    var APIProfile = app.api.profile(app);

    app.route("/profile/:id")
    .get(APIProfile.get)
    .post(APIProfile.insert);

    app.route("/profile/:id/user/:user")
    .put(APIProfile.update)
    .delete(APIProfile.delete);

    app.route("/profile/:id/password/:user")
        .put(APIProfile.updatePassword);
}