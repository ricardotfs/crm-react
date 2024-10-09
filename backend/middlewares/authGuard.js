const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET
const {executeQuery} = require('../config/db.js') 

const authGuard = async(req,res,next) =>{

    const authHeader = req.headers["authorization"]
    const token = authHeader && authHeader.split(' ')[1];

    //check if header has a token

    if(!token) return res.status(401).json({errors:['Acesso negado!']});

    try {

        const verifed = jwt.verify(token,jwtSecret);

        req.user = await executeQuery(`SELECT id,Nome FROM crmreactdb.Usuario Where id = ${verifed.id}`);
        
        next();
        
    } catch (error) {
        res.status(401).json({errors:['Token inválido.']});
    }

}
module.exports = authGuard;