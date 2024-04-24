const { executeQuery, executeQueryReturn } = require('../config/db.js')

const getById = async (req, res) => {

    const { id, tipo } = req.body;

    let descricaoTipo = 'Ticket';
    if (tipo === 6)
        descricaoTipo = 'Ticket';

    const activity = await executeQuery(`
                                        SELECT 
                                            ${descricaoTipo}.Id,
                                            ${descricaoTipo}.IdConta,
                                            ${descricaoTipo}.Token,
                                            ${descricaoTipo}.DataCriacao,
                                            Status.Nome As Status,
                                            UsuarioCriacao.Nome AS UsuarioCriacao,
                                            ${descricaoTipo}.DataAlteracao,
                                            UsuarioAlteracao.Nome AS UsuarioAlteracao,
                                            Proprietario.Nome AS Proprietario,
                                            ${descricaoTipo}.IdStatus${descricaoTipo}
                                        FROM ${descricaoTipo}
                                        LEFT JOIN Usuario AS UsuarioCriacao ON UsuarioCriacao.Id = ${descricaoTipo}.IdUsuarioCriacao
                                        LEFT JOIN statusticket AS Status ON Status.Id = ${descricaoTipo}.IdStatusTicket
                                        LEFT JOIN Usuario AS UsuarioAlteracao ON UsuarioAlteracao.Id = ${descricaoTipo}.IdusuarioAlteracao
                                        LEFT JOIN Usuario AS Proprietario ON Proprietario.Id = ${descricaoTipo}.IdProprietario
                                        WHERE ${descricaoTipo}.Id = ${id}`);

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