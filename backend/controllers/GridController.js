
const {executeQuery} = require('../config/db.js') 

const getAllActivity = async(req,res) =>{

    const {idTipoCadastro} = req.body;

    const fields = await executeQuery(`SELECT 
                                            propriedade.Id IdPropriedade,
                                            propriedade.IdPropriedadeGrupo,
                                            propriedadegrupo.Ordem GrupoOrdem,
                                            propriedade.Nome,
                                            propriedade.Ordem PropriedadeOrdem
                                        from propriedadegrupo 
                                        inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                                        where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})`);

                                    ;

    if(fields.length === 0){
        return res.status(200).json([]);
    }

    let queryFields = ' propriedaderespostaticket.IdUser Id';

    fields.forEach(item => {
        queryFields = queryFields + ',MAX(CASE WHEN propriedade.Nome = ' + `'${item.Nome}'` + ' THEN propriedaderespostaticket.Resposta END) AS `' + item.Nome + '_'  + item.IdPropriedade + '_' + item.IdPropriedadeGrupo + '` '
    });

    let query  = `  SELECT 
                        ${queryFields}
                    from propriedadegrupo 
                        inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                        left join propriedaderespostaticket on propriedaderespostaticket.IdPropriedade = propriedade.Id
                    GROUP BY propriedaderespostaticket.IdUser;`;

  

   let result = await executeQuery(query);


   return res.status(200).json(result);
}

module.exports ={
    getAllActivity
}