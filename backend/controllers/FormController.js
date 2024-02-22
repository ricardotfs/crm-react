const { executeQuery } = require('../config/db.js')

const getById = async (req, res) => {

    const { id } = req.params;
    console.log(id);

    const groups = await executeQuery(`SELECT 
                                            Id,IdConta,IdTipoCadastro,Ordem,1 Ativo,Nome 
                                       FROM propriedadegrupo 
                                       where IdTipoCadastro = 6
                                       order by propriedadegrupo.Ordem`)

    for (let index = 0; index < groups.length; index++) {
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

        properties.forEach(async (el) => {
            if (el.IdTipoPropriedade === 2) {
                const fields = await executeQuery(`select Id,IdPropriedade,Valor from PropriedadeCampos where IdPropriedade = ${el.Id}`);


                el.Campos = fields;
                console.log(el.Campos)


            }
        });

        group.properties = properties;

    }

    setTimeout((t => {
        console.log(groups);

        return res.status(200).json({
            activity: { Id: id, Token: `TKT${id}` },
            groups
        });

    }), 500)

}

const update = async(req,res) =>{
 
    const {id,properties} = req.body;

    for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];

        executeQuery(`CALL UpsertPropriedadeRespostaTicket(${prop.Id}, 1,  ${id}, '${prop.Resposta}');`);
        
    } 

    setTimeout((t => {

        return res.status(200).json({
            msg:'Alterado com sucesso'
        });

    }), 500)

}

module.exports = {
    getById,
    update
}   