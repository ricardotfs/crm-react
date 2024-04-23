const { executeQuery, executeQueryReturn } = require('../config/db.js')

const getById = async (req, res) => {

    const { id, tipo } = req.body;

    let descricaoTipo = 'Ticket';
    if (tipo === 6)
        descricaoTipo = 'Ticket';

    const activity = await executeQuery(`SELECT 
                                            Id,IdConta,Token,DataCriacao,IdUsuarioCriacao,DataAlteracao,
                                            IdusuarioAlteracao,IdProprietario,IdStatusTicket
                                        FROM ${descricaoTipo} 
          
                                        WHERE Id = ${id}`);

    const groups = await executeQuery(`SELECT 
                                            Id,IdConta,IdTipoCadastro,Ordem,1 Ativo,Nome 
                                       FROM propriedadegrupo 
                                       where IdTipoCadastro = 6
                                       order by propriedadegrupo.Ordem`);

    for (let index = 0; index < groups.length; index++) {
        const group = groups[index];

        const properties = await executeQuery(` select 
                                                        propriedade.Id,propriedade.IdConta,propriedade.IdPropriedadeGrupo,
                                                        propriedade.IdTipoPropriedade,propriedade.Nome,propriedade.Descricao,
                                                        propriedade.Ordem,
                                                        propriedaderesposta${descricaoTipo}.Resposta 
                                                from propriedade 
                                                left join propriedaderesposta${descricaoTipo} on propriedade.Id = propriedaderesposta${descricaoTipo}.IdPropriedade  and propriedaderespostaticket.Iduser = ${id}
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

        console.log(activity[0]);
        
        return res.status(200).json({
            header:activity[0],
            activity: { Id: id, Token: `TKT${id.toString().padStart(5, '0')}` },
            groups
        });

    }), 500)

}

const update = async (req, res) => {

    const { id, idConta, properties } = req.body;

    let idAtiv = id;

    if (idAtiv == 0) {
        let result = await executeQueryReturn(`INSERT INTO ticket (IdConta,DataCriacao,Token,IdStatusTicket) VALUES(${idConta},NOW(),'',1);`);
        idAtiv = result[0].lastInsertId;

        executeQuery(`UPDATE Ticket set Token  = 'TKT${idAtiv.toString().padStart(5, '0')}' where id = ${idAtiv}`);
    }

    for (let i = 0; i < properties.length; i++) {
        const prop = properties[i];

        executeQuery(`CALL InsertOrUpdatePropriedadeRespostaTicket(${prop.Id}, ${idConta},  ${idAtiv}, '${prop.Resposta}');`);

    }

    setTimeout((t => {

        return res.status(200).json({
            msg: 'Alterado com sucesso'
        });

    }), 500)

}

module.exports = {
    getById,
    update
}   