const mongoose = require('mongoose');
require('./../models/user.model');
const User = mongoose.model('User');
const register = async function(req,res,next){
    try{
        const user = new User();
        user.firstName = req.body.FirstName;
        user.lastName = req.body.LastName;
        user.role = req.body.Role;
        user.email = req.body.Email;
        user.password = req.body.Password;
        user.save((err, doc) => {
            if (!err)
                return res.status(200).json({code:200, payload: doc });
            else {
                if (err.code == 11000)
                    res.status(422).send(['Duplicate email adrress found']);
                else
                    return next(err);
            }

        });
    }
    catch (e) {
        res.status(500).send(['something went to wrong!']);
    }
}

module.exports = {
    register: register
}