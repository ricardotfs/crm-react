const {executeQuery} = require('../config/db.js') 

const getById = async(req,res) => {

    const {id} = req.params;   
    console.log(id);

    const groups = await executeQuery(`SELECT 
                                            Id,IdConta,IdTipoCadastro,Ordem,Ativo,Nome 
                                       FROM crmreactdb.propriedadegrupo 
                                       where IdTipoCadastro = 6
                                       order by propriedadegrupo.Ordem`)
    
    for (let index = 0; index < groups.length; index ++) {
        const group = groups[index];
        
        const properties = await executeQuery(` select 
                                                        propriedade.Id,propriedade.IdConta,propriedade.IdPropriedadeGrupo,
                                                        propriedade.IdTipoPropriedade,propriedade.Nome,propriedade.Descricao,
                                                        propriedade.Ordem,
                                                        propriedaderespostaticket.Resposta 
                                                from propriedade 
                                                left join propriedaderespostaticket  on propriedade.Id = propriedaderespostaticket.IdPropriedade  and propriedaderespostaticket.Iduser = ${id}
                                                where IdPropriedadeGrupo = ${group.Id}
                                                order by propriedade.Ordem  `);
            
        group.properties = properties;
    }

    console.log({
        activity:{Id:id,Token:`TKT${id}`},
        groups
    });

   return res.status(200).json({
                                activity:{Id:id,Token:`TKT${id}`},
                                groups
                            });

}

module.exports ={
    getById
}