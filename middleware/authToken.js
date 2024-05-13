const jwt = require('jsonwebtoken');
const secretKey = 'this_is_my_secret_key';


const authTokenMiddleware = (req, res, next) =>{
    try{
        const  token = req.headers.authorization.split(' ')[1];
        const decoded = jwt.verify(token,secretKey)
        req.user = decoded;
        next();
    }
    catch(err){
        console.log(err)
    }
}

module.exports = authTokenMiddleware;