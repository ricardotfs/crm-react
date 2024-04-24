
const {executeQuery} = require('../config/db.js') 

const getAllActivity = async(req,res) =>{

    const {idTipoCadastro,page,sizePage,sorting,filter} = req.body;     
    const column = sorting[0].columnName;
    const direction = sorting[0].direction;;

    const fields = await executeQuery(`

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
                                            where propriedadegrupo.idTipoCadastro in(${idTipoCadastro}) 
                                            and propriedade.IsGrid = 1`);

    if(fields.length === 0){
        return res.status(200).json([]);
    }

    let queryFields = ' ticket.Token';

    fields.forEach(item => {
        queryFields = queryFields + ',MAX(CASE WHEN propriedade.Nome = ' + `'${item.Nome}'` + ' THEN propriedaderespostaticket.Resposta END) AS `' + item.Nome + '` '
    });

    let query  = ` 	SELECT * FROM (
                        SELECT 
                            ${queryFields}
                        from propriedadegrupo 
                            inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                            inner join propriedaderespostaticket on propriedaderespostaticket.IdPropriedade = propriedade.Id
                            inner join ticket on ticket.id = propriedaderespostaticket.IdUser
                        where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})
                        GROUP BY propriedaderespostaticket.IdUser
                        ) as temp
                            where 1=1 ${filter}
                            order by temp.${column} ${direction}
                            Limit ${(page * sizePage)}, ${sizePage};`;       

    let queryCount  = ` SELECT count(1) totalCount FROM (
                            SELECT 
                                ${queryFields}
                            from propriedadegrupo 
                                inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                                inner join propriedaderespostaticket on propriedaderespostaticket.IdPropriedade = propriedade.Id
                                inner join ticket on ticket.id = propriedaderespostaticket.IdUser
                            where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})
                            GROUP BY propriedaderespostaticket.IdUser
                            ) as temp
                                where 1=1 ${filter}`;

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