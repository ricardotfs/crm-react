

const { executeQuery, executeQueryReturn } = require('../config/db.js');

class FormServiceDomain {
    constructor() {}

    getDescricaoTipoToken(tipo) {
        switch (tipo) {
            case 6:
                return { descricaoTipo: 'Ticket', descricaoToken: 'TKT' };
            case 4:
                return { descricaoTipo: 'phone', descricaoToken: 'PH' };
            case 1:
                return { descricaoTipo: 'Contato', descricaoToken: 'CN' };
            default:
                return { descricaoTipo: 'Ticket', descricaoToken: 'TKT' };
        }
    }

    async getById(req, res) {
        const { id, tipo } = req.body;
        const { descricaoTipo, descricaoToken } = this.getDescricaoTipoToken(tipo);

        const activityQuery = `
            SELECT 
                ${descricaoTipo}.Id,
                ${descricaoTipo}.IdConta,
                ${descricaoTipo}.Token,
                ${descricaoTipo}.DataCriacao,
                Status.Nome AS Status,
                UsuarioCriacao.Nome AS UsuarioCriacao,
                ${descricaoTipo}.DataAlteracao,
                UsuarioAlteracao.Nome AS UsuarioAlteracao,
                Proprietario.Nome AS Proprietario,
                ${descricaoTipo}.IdStatus${descricaoTipo}
            FROM ${descricaoTipo}
            LEFT JOIN Usuario AS UsuarioCriacao ON UsuarioCriacao.Id = ${descricaoTipo}.IdUsuarioCriacao
            LEFT JOIN status${descricaoTipo} AS Status ON Status.Id = ${descricaoTipo}.IdStatus${descricaoTipo}
            LEFT JOIN Usuario AS UsuarioAlteracao ON UsuarioAlteracao.Id = ${descricaoTipo}.IdusuarioAlteracao
            LEFT JOIN Usuario AS Proprietario ON Proprietario.Id = ${descricaoTipo}.IdProprietario
            WHERE ${descricaoTipo}.Id = ${id}`;

        const activity = await executeQuery(activityQuery);

        const groupsQuery = `
            SELECT 
                Id, IdConta, IdTipoCadastro, Ordem, 1 AS Ativo, Nome 
            FROM propriedadegrupo 
            WHERE IdTipoCadastro = ${tipo}
            ORDER BY propriedadegrupo.Ordem`;

        const groups = await executeQuery(groupsQuery);

        for (const group of groups) {
            const propertiesQuery = `
                SELECT 
                    propriedade.Id, propriedade.IdConta, propriedade.IdPropriedadeGrupo,
                    propriedade.IdTipoPropriedade, propriedade.Nome, propriedade.Descricao,
                    propriedade.Ordem, propriedade.IsRequired,
                    propriedaderesposta${descricaoTipo}.Resposta 
                FROM propriedade 
                LEFT JOIN propriedaderesposta${descricaoTipo} ON propriedade.Id = propriedaderesposta${descricaoTipo}.IdPropriedade 
                    AND propriedaderesposta${descricaoTipo}.Iduser = ${id}
                WHERE IdPropriedadeGrupo = ${group.Id}
                ORDER BY propriedade.Ordem`;

            group.properties = await executeQuery(propertiesQuery);

            for (const el of group.properties) {
                if (el.IdTipoPropriedade === 2) {
                    const fieldsQuery = `SELECT Id, IdPropriedade, Valor FROM PropriedadeCampos WHERE IdPropriedade = ${el.Id}`;
                    el.Campos = await executeQuery(fieldsQuery);
                }
            }
        }

        setTimeout(() => {
            return res.status(200).json({
                header: activity[0],
                activity: { Id: id, Token: `${descricaoToken}${id.toString().padStart(5, '0')}` },
                groups
            });
        }, 500);
    }

    async update(req, res) {
        const { id, tipo, idConta, properties } = req.body;
        const { descricaoTipo, descricaoToken } = this.getDescricaoTipoToken(tipo);

        let idAtiv = id;

        if (idAtiv === 0) {
            const insertQuery = `
                INSERT INTO ${descricaoTipo} (IdConta, DataCriacao, Token, IdStatus${descricaoTipo}) 
                VALUES(${idConta}, NOW(), '', 1);`;

            const result = await executeQueryReturn(insertQuery);
            idAtiv = result[0].lastInsertId;

            const updateTokenQuery = `
                UPDATE ${descricaoTipo} 
                SET Token = '${descricaoToken}${idAtiv.toString().padStart(5, '0')}' 
                WHERE id = ${idAtiv};`;

            await executeQuery(updateTokenQuery);
        }

        for (const prop of properties) {
            const insertOrUpdateQuery = `
                CALL InsertOrUpdatePropriedadeResposta${descricaoTipo}(${prop.Id}, ${idConta}, ${idAtiv}, '${prop.Resposta}');`;
            await executeQuery(insertOrUpdateQuery);
        }

        setTimeout(() => {
            return res.status(200).json({ msg: 'Alterado com sucesso' });
        }, 500);
    }
}

module.exports = FormServiceDomain;
