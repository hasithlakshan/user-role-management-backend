const config = require("../../config/default");
const jwt = require("jsonwebtoken");
// const verifyToken = (token) => {
//     return new Promise((resolve, reject) => {
//         try {
//             const privateKey = config.privateKey;
//             const object =  jwt.verify(token, privateKey)
//             resolve(object);
//         } catch (err) {
//             reject(err);
//         }
//     });
// }

const verifyToken = async (req, res, next) => {
    let token;
    token  = req.headers.token

    if (!token)
        return res.status(403).send({ auth: false, message: 'No token provided.' });
    else {
        jwt.verify(token, process.env.JWT_SECRET,
            (err, decoded) => {
                if (err)
                    return res.status(500).send({ auth: false, message: 'Token authentication failed.' });
                else {
                    req._id = decoded._id;
                    next();
                }
            }
        )
    }
}
module.exports = {
    verifyToken: verifyToken
}