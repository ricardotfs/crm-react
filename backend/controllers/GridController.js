
const {executeQuery} = require('../config/db.js') 

const getAllActivity = async(req,res) =>{

    const {idTipoCadastro,page,sizePage} = req.body;
    const pageAux = page - 1;
    
    const fields = await executeQuery(`SELECT 										
                                            propriedade.Nome,
                                            propriedade.Nome Title,
                                            propriedade.Id IdPropriedade,
                                            propriedade.IdPropriedadeGrupo idPropriedadeGrupo,
                                            propriedadegrupo.Nome nomeGrupo,
                                            IFNULL(propriedadegrupo.Ordem,0) GrupoOrdem,
                                            IFNULL(propriedade.Ordem,0) PropriedadeOrdem,
                                            '' resposta
                                        FROM propriedadegrupo 
                                            INNER JOIN propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                                            where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})`);

    if(fields.length === 0){
        return res.status(200).json([]);
    }

    let queryFields = ' propriedaderespostaticket.IdUser Id';

    fields.forEach(item => {
        queryFields = queryFields + ',MAX(CASE WHEN propriedade.Nome = ' + `'${item.Nome}'` + ' THEN propriedaderespostaticket.Resposta END) AS `' + item.Nome + '` '
    });

    let query  = `  SELECT 
                        ${queryFields}
                    from propriedadegrupo 
                        inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                        left join propriedaderespostaticket on propriedaderespostaticket.IdPropriedade = propriedade.Id
                    where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})
                    GROUP BY propriedaderespostaticket.IdUser
                     Limit ${pageAux}, ${sizePage};`;

  
    let queryCount  = ` SELECT 
                            count(1)  totalCount
                        from Ticket;`;

    const result = await executeQuery(query);
    const totalCount = await executeQuery(queryCount);


   return res.status(200).json({
        columns:fields,
        rows:result,
        totalCount:totalCount[0].totalCount
   });
}

module.exports ={
    getAllActivity
}