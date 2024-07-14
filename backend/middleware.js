const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('./config');

const authMiddleware = (req, res, next) => {
    const authorized = req.headers.authorization;

    if(!authorized || !authorized.startsWith('Bearer ')){
        return res.json({
            msg: "Not Valid authorization!"
        })
    }

    const token = authorized.split(' ')[1];

    try{
        const decoded = jwt.verify(token, JWT_SECRET);

        if(decoded.userId){
            req.userId = decoded.userId;
            next();
        }else{
            return res.status(403).json({
                msg: "Cannot decoded!"
            })
        }
    }catch(err){
        return res.status(403).json({
            msg: "Error!"
        });
    }
}

module.exports = {
    authMiddleware
}