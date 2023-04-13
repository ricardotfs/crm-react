const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const {executeQuery} = require('../config/db.js') 

const jwtSecret = process.env.JWT_SECRET;

const generateToken = (id) =>{
    return jwt.sign({id},jwtSecret,{
        expiresIn:'7d',
    });
}

const register = async(req,res) =>{
    const {name,email,password} = req.body;
 

    const user = await executeQuery(`SELECT Id FROM crmreactdb.Usuario Where Email = '${email}'`);
    
    if(user.length > 0){
        res.status(422).json({errors:['Por favor, utilize outro e-mail']});
        return;
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password,salt);

    await executeQuery(` INSERT INTO crmreactdb.Usuario (Nome,Email,Senha) values ('${name}','${email}','${passwordHash}')`)
    
    const user1 = await executeQuery(`SELECT Id FROM crmreactdb.Usuario Where Email = '${email}'`);

    if(!user1.length === 0){
        res.status(422).json({errors:['Houve um erro, por favor tente mais tarde']});
        return;
    }

    return res.status(201).json({
        id: user.Id,
        token:generateToken(user.Id)
    })
}

const login  = async (req,res) =>{
    const {email,password} = req.body;

    const users = await executeQuery(`SELECT Id,senha  FROM crmreactdb.Usuario Where Email = '${email}'`);

    if(users.length === 0){
        res.status(404).json({errors:["Usuário não encontrado."]})
        return;
    }

    if(!(await bcrypt.compare(password,users[0].senha)) ){
        res.status(422).json({errors:['Senha inválida']});
        return;
    }
    
    res.status(201).json({
        id:users[0].id,
        //profileImage:user.profileImage,
        token:generateToken(users[0].id)
    });
}

module.exports = {
    register,
    login,
}