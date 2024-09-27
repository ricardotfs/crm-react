
const {executeQuery} = require('../config/db.js') 

const getDynamicColumns = (result) => {
    if(result === undefined || result.length  == 0)
        return ['Id'];
    let columns = Object.keys(result[0]);

    columns = columns.filter((el) => {
        if(el !== 'Id')
            return el;
    });
    return columns;
  }

const getAllActivity = async(req,res) =>{

    const {idTipoCadastro,page,sizePage,sorting,filter} = req.body;     
    let descricaoTipo = 'Ticket';
    let descricaoToken = 'TKT';
    if (idTipoCadastro === 6){
        descricaoTipo = 'Ticket';
        descricaoToken = 'TKT';
    }
    else if (idTipoCadastro === 4){
        descricaoTipo = 'phone';
        descricaoToken = 'PH';
    }
    else if (idTipoCadastro === 1){
        descricaoTipo = 'Contato';
        descricaoToken = 'CN';
    }

    const column = '';//sorting[0].columnName;
    const direction = '';//sorting[0].direction;;

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

    let queryFields = ` ${descricaoTipo}.Token,${descricaoTipo}.Id`;

    fields.forEach(item => {
        queryFields = queryFields + ',MAX(CASE WHEN propriedade.Nome = ' + `'${item.Nome}'` + ' THEN propriedaderesposta' + descricaoTipo + '.Resposta END) AS `' + item.Nome + '` '
    });
    
    
    let query  = ` 	SELECT * FROM (
                        SELECT 
                            ${queryFields}
                        from propriedadegrupo 
                            inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                            inner join propriedaderesposta${descricaoTipo} on propriedaderesposta${descricaoTipo}.IdPropriedade = propriedade.Id
                            inner join ${descricaoTipo} on ${descricaoTipo}.id = propriedaderesposta${descricaoTipo}.IdUser
                        where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})
                        GROUP BY propriedaderesposta${descricaoTipo}.IdUser
                        ) as temp
                            where 1=1 -- ${descricaoTipo}.Token like '%${filter}%'
                           --  order by temp.${column} ${direction}
                            Limit ${page * sizePage}, ${sizePage};`;       

    
    let queryCount  = ` SELECT count(1) totalCount FROM (
                            SELECT 
                                ${queryFields}
                            from propriedadegrupo 
                                inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                                inner join propriedaderesposta${descricaoTipo} on propriedaderesposta${descricaoTipo}.IdPropriedade = propriedade.Id
                                inner join ${descricaoTipo} on ${descricaoTipo}.id = propriedaderesposta${descricaoTipo}.IdUser
                            where propriedadegrupo.idTipoCadastro in(${idTipoCadastro})
                            GROUP BY propriedaderesposta${descricaoTipo}.IdUser
                            ) as temp
                                where 1=1 ${filter}`;

    const result = await executeQuery(query);
    const totalCount = await executeQuery(queryCount);


   return res.status(200).json({
        columns:getDynamicColumns(result),
        rows:result,
        totalCount:totalCount[0].totalCount
   });
}

module.exports ={
    getAllActivity
}