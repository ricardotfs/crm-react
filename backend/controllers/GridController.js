
const {executeQuery} = require('../config/db.js') 

const getAllActivity = async(req,res) =>{

    const {idTipoCadastro} = req.params;

    const fields = await executeQuery(`SELECT 
                                            propriedade.IdPropriedadeGrupo,
                                            propriedadegrupo.Ordem GrupoOrdem,
                                            propriedade.Nome,
                                            propriedade.Ordem PropriedadeOrdem
                                        from propriedadegrupo 
                                        inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                                        where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})`);

    console.log(fields)                                        ;
    
    if(fields.length === 0){
        return;
    }

    let queryFields = ' propriedaderespostaticket.IdUser Id';

    fields.forEach(item => {
        queryFields = queryFields + `,MAX(CASE WHEN propriedade.Nome = '${item.Nome}' THEN propriedaderespostaticket.Resposta END) AS ${item.Nome}' `
    });


    let query  = `  SELECT 
                        ${queryFields}
                    from propriedadegrupo 
                        inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                        left join propriedaderespostaticket on propriedaderespostaticket.IdPropriedade = propriedade.Id
                    GROUP BY propriedaderespostaticket.IdUser;`;

   let result = executeQuery(query);

   return res.status(200).json(result);
}

module.exports ={
    getAllActivity
}