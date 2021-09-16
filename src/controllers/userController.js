require('./../models/user.model');
const mongoose = require("mongoose");
const User = mongoose.model('User');

const updateUser = async function(req,res, next){
    try {
        const { role } = req.body
        const { userId } = req.params
        User.updateOne({_id: userId},{ $set: { "role" : role } },(err, doc) => {
            if (!err){
                return res.status(200).json({code:200, payload: doc });
            }
            else {
                return res.status(400).json(err)
            }

        });
    }catch (e) {
        return res.status(401).json(e)
    }


}

const getUsers = async (req,res,next) => {
    User.find({},(err, doc) => {
        if (!err){
            return res.status(200).json({code:200, payload: doc });
        }
        else {
            return res.status(400).json(err)
        }

    });
};

const deleteUser = async (req, res, next) => {
    try{
        const { userId } = req.params
        User.deleteOne({_id: userId},(err, doc) => {
            if (!err){
                return res.status(200).json({code:200, payload: doc });
            }
            else {
                return res.status(400).json(err)
            }

        });
    }
    catch (e) {
        return res.status(400).json(e)
    }
};

module.exports = {
    getUsers: getUsers,
    deleteUser: deleteUser,
    updateUser: updateUser
}