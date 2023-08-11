const {executeQuery} = require('../config/db.js') 

const getById = async(req,res) => {

    const {id} = req.params;   
    const groups = await executeQuery(`SELECT 
                                            Id,IdConta,IdTipoCadastro,Ordem,Ativo,Nome 
                                       FROM crmreactdb.propriedadegrupo 
                                       where IdTipoCadastro = 6
                                       order by propriedadegrupo.Ordem`)
    
    for (let index = 0; index < groups.length; index++) {
        const group = groups[index];
        
        const properties = await executeQuery(` select 
                                                        Id,IdConta,IdPropriedadeGrupo,IdTipoPropriedade,Nome,Descricao,Ordem 
                                                from propriedade 
                                                where IdPropriedadeGrupo = ${group.Id}
                                                order by propriedade.Ordem  `);
            
        group.properties = properties;
    }


   return res.status(200).json({
                                activity:{Id:id,Token:`TKT${id}`},
                                groups
                            });

}

module.exports ={
    getById
}