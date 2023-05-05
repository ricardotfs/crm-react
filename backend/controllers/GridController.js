
const {executeQuery} = require('../config/db.js') 

const getAllActivity = async(req,res) =>{

    const {idTipoCadastro,page,sizePage} = req.body;
    
    const fields = await executeQuery(`
                                        SELECT 'Token' Nome, 'Token' Title, 0 IdPropriedade,0 idPropriedadeGrupo, 0 nomeGrupo, 0 GrupoOrdem, 0 PropriedadeOrdem ,'' resposta                     
                                        union all 
                                        SELECT 										
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
                                            where propriedadegrupo.idTipoCadastro in(${idTipoCadastro}) `);

    if(fields.length === 0){
        return res.status(200).json([]);
    }

    let queryFields = ' propriedaderespostaticket.IdUser Id';

    fields.forEach(item => {
        queryFields = queryFields + ',MAX(CASE WHEN propriedade.Nome = ' + `'${item.Nome}'` + ' THEN propriedaderespostaticket.Resposta END) AS `' + item.Nome + '` '
    });

    let query  = `  SELECT 
                        ${queryFields}
                        ,ticket.Token
                    from propriedadegrupo 
                        inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                        inner join propriedaderespostaticket on propriedaderespostaticket.IdPropriedade = propriedade.Id
                        inner join ticket on ticket.id = propriedaderespostaticket.IdUser
                    where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})
                    GROUP BY propriedaderespostaticket.IdUser
                     Limit ${(page * sizePage)}, ${sizePage};`;

    let queryCount  = ` SELECT 
                            count(1)  totalCount
                        from Ticket;`;

    const result = await executeQuery(query);
    const totalCount = await executeQuery(queryCount);

   return res.status(200).json({
        rows:result,
        totalCount:totalCount[0].totalCount
   });
}

module.exports ={
    getAllActivity
}