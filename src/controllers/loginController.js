const passport = require('passport');
const login = async function(req, res, next){
    //call for passport authentication
    passport.authenticate('local', (err, user, info) => {
        // error from passport middleware
        if (err) return res.status(400).json(err);
        // registered user
        else if (user) return res.status(200).json(
            {
                code:200,
                payload: user,
                "token": user.generateJwt(
                    {
                        _id: user._id,
                        firstName: user.firstName,
                        lastName: user.lastName,
                        role: user.role,
                        email: user.email
                    })
            });
        // unknown user or wrong password
        else return res.status(404).json(info);
    })(req, res, next);
}
module.exports = {
    login: login
}