const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const mysql = require('mysql2');

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) =>{
    return jwt.sign({id},jwtSecret,{
        expiresIn:'7d',
    });
}

const register = async(req,res) =>{
    const {name,email,password} = req.body;
 
    //const request = new mysql.Request();
     const teste = {id:10};
  const request = new mysql.Request();
    request.query('SELECT * FROM crmreactdb.teste', (err, result) => {
        if (err) {
            console.log(err)
        } else {
            console.log(result.recordset[0].name)
        }
    });

    res.status(200).json(teste);
}

module.exports = {
    register,
}