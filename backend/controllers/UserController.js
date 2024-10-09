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
 

    const user = await executeQuery(`SELECT Id FROM Usuario Where Email = '${email}'`);
    
    if(user.length > 0){
        res.status(422).json({errors:['Por favor, utilize outro e-mail']});
        return;
    }

    const salt = await bcrypt.genSalt()
    const passwordHash = await bcrypt.hash(password,salt);

    await executeQuery(` INSERT INTO Usuario (Nome,Email,Senha) values ('${name}','${email}','${passwordHash}')`)
    
    const user1 = await executeQuery(`SELECT Id FROM Usuario Where Email = '${email}'`);

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

    const users = await executeQuery(`SELECT id,senha FROM Usuario Where Email = '${email}'`);

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

const update = async (req,res)=>{

    const {name,password} = req.body

    let profileImage = null

    if(req.file){
        profileImage = req.file.filename
    }

    const reqUser = req.user;
    const users = await executeQuery(`SELECT Id,nome,senha,imagem FROM Usuario Where Id = '${reqUser.id}'`);
    if(users.length === 0){
        return;
    }
    if(name){
        users[0].nome = name;
    }
    if(password){
        const salt = await bcrypt.genSalt();
        const passwordHash = await bcrypt.hash(password,salt);

        users[0].senha = passwordHash;
    }
    if(profileImage){
        users[0].imagem = profileImage
    }
    await executeQuery(`update Usuario set 
                                Nome = '${ users[0].nome}', 
                                Email = '${ users[0].email}', 
                                Imagem = '${ users[0].imagem}' 
                        where id = '${reqUser.id}' `);

    return res.status(200).json(users[0]);
}


module.exports = {
    register,
    login,
    update,
}