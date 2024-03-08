const { executeQuery ,executeQueryReturn} = require('../config/db.js')

const getById = async (req, res) => {

    const {id,tipo} = req.body;

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
                                                        propriedaderesposta${tipo}.Resposta 
                                                from propriedade 
                                                left join propriedaderesposta${tipo} on propriedade.Id = propriedaderesposta${tipo}.IdPropriedade  and propriedaderespostaticket.Iduser = ${id}
                                                where IdPropriedadeGrupo = ${group.Id}
                                                order by propriedade.Ordem  `);

        properties.forEach(async (el) => {
            if (el.IdTipoPropriedade === 2) {
                const fields = await executeQuery(`select Id,IdPropriedade,Valor from PropriedadeCampos where IdPropriedade = ${el.Id}`);
                el.Campos = fields;
            }
        });

        group.properties = properties;

    }

    setTimeout((t => {
        return res.status(200).json({
            activity: { Id: id, Token: `TKT${id}` },
            groups
        });

    }), 500)

}

const update = async(req,res) =>{
 
    const {id,idConta,properties} = req.body;

    let idAtiv = id;

    if(id == 0){
       let result =  await executeQueryReturn(`insert into Ticket (token) values('adfasdf')`);
       idAtiv = result[0].lastInsertId;
    }

    for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];

        executeQuery(`CALL UpsertPropriedadeRespostaTicket(${prop.Id}, ${idConta},  ${idAtiv}, '${prop.Resposta}');`);
        
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