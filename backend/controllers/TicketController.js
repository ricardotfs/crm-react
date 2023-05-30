const {executeQuery} = require('../config/db.js') 

const getById = async(req,res) => {

    const {id} = req.params;   

    const group = await executeQuery(`
                                        SELECT 
                                            IFNULL(propriedaderespostaticket.IdUser,${id}) Id,
                                            propriedade.IdPropriedadeGrupo,
                                            propriedadegrupo.Nome,
                                            propriedadegrupo.Ordem GrupoOrdem,
                                            propriedade.Nome,
                                            propriedade.Ordem PropriedadeOrdem,
                                            IFNULL(propriedaderespostaticket.resposta,'') Resposta
                                        from propriedadegrupo
                                        inner join propriedade  on propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                                        left join propriedaderespostaticket on propriedade.Id  = propriedaderespostaticket.IdPropriedade and propriedaderespostaticket.IdUser = ${id}
                                        where propriedadegrupo.idTipoCadastro in(6)
                                            and propriedade.ativo = 1
                                        order by propriedadegrupo.Ordem,propriedade.Ordem;`);

    const activity = await executeQuery(`
                                            select Id,Token from ticket  where id = 1
                                        `);

   return res.status(200).json({
                                activity:activity[0],
                                group
                            });

}

module.exports ={
    getById
}