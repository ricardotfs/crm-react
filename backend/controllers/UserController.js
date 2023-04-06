const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {getUsers} = require('../config/db.js') 

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) =>{
    return jwt.sign({id},jwtSecret,{
        expiresIn:'7d',
    });
}

const register = async(req,res) =>{
    const {name,email,password} = req.body;
 
    //const request = new mysql.Request();

  //const request = new mysql.Request();
    const teste = await getUsers('SELECT * FROM crmreactdb.teste');

    return res.status(200).json(teste);
}

module.exports = {
    register,
}