const {executeQuery} = require('../config/db.js') 

class GridService {
    constructor(req) {
        const { idTipoCadastro, page, sizePage, sorting, filter } = req.body;
        this.idTipoCadastro = idTipoCadastro;
        this.page = page;
        this.sizePage = sizePage;
        this.sorting = sorting || [];
        this.filter = filter || '';
        this.descricaoTipo = this.getDescricaoTipo();
        this.descricaoToken = this.getDescricaoToken();
    }

    getDescricaoTipo() {
        switch (this.idTipoCadastro) {
            case 6:
                return 'Ticket';
            case 4:
                return 'Phone';
            case 1:
                return 'Contato';
            default:
                return 'Ticket';
        }
    }

    getDescricaoToken() {
        switch (this.idTipoCadastro) {
            case 6:
                return 'TKT';
            case 4:
                return 'PH';
            case 1:
                return 'CN';
            default:
                return 'TKT';
        }
    }

    async getFields() {
        const query = `
            SELECT 
                propriedade.Nome,
                propriedade.Nome Title,
                propriedade.Id IdPropriedade,
                propriedade.IdPropriedadeGrupo idPropriedadeGrupo,
                propriedadegrupo.Nome nomeGrupo,
                IFNULL(propriedadegrupo.Ordem, 0) GrupoOrdem,
                IFNULL(propriedade.Ordem, 0) PropriedadeOrdem,
                '' resposta
            FROM propriedadegrupo
            INNER JOIN propriedade ON propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
            WHERE propriedadegrupo.idTipoCadastro IN (${this.idTipoCadastro})
            AND propriedade.IsGrid = 1
        `;
        return await executeQuery(query);
    }

    buildQueryFields(fields) {
        let queryFields = `${this.descricaoTipo}.Token, ${this.descricaoTipo}.Id`;
        fields.forEach(item => {
            queryFields += `, MAX(CASE WHEN propriedade.Nome = '${item.Nome}' THEN propriedaderesposta${this.descricaoTipo}.Resposta END) AS '${item.Nome}'`;
        });
        return queryFields;
    }

    buildWhereClause(fields) {
        let where = '';
        fields.forEach(item => {
            const field = `temp.\`${item.Nome}\``;
            where += `${field} LIKE '${this.filter}%' OR `;
        });
        if (where.length > 0) {
            where = `AND (temp.Token LIKE '${this.filter}%' OR ${where.substring(0, where.length - 4)})`;
        }
        return where;
    }

    async getQueryResult(queryFields, whereClause) {
        const query = `
            SELECT * FROM (
                SELECT 
                    ${queryFields}
                FROM propriedadegrupo
                INNER JOIN propriedade ON propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                INNER JOIN propriedaderesposta${this.descricaoTipo} ON propriedaderesposta${this.descricaoTipo}.IdPropriedade = propriedade.Id
                INNER JOIN ${this.descricaoTipo} ON ${this.descricaoTipo}.id = propriedaderesposta${this.descricaoTipo}.IdUser
                WHERE propriedadegrupo.idTipoCadastro IN (${this.idTipoCadastro})
                GROUP BY propriedaderesposta${this.descricaoTipo}.IdUser
            ) AS temp
            WHERE 1=1 ${whereClause}
            LIMIT ${this.page * this.sizePage}, ${this.sizePage};
        `;

        return await executeQuery(query);
    }

    async getQueryCount(queryFields) {
        const queryCount = `
            SELECT count(1) totalCount FROM (
                SELECT 
                    ${queryFields}
                FROM propriedadegrupo
                INNER JOIN propriedade ON propriedadegrupo.Id = propriedade.IdPropriedadeGrupo
                INNER JOIN propriedaderesposta${this.descricaoTipo} ON propriedaderesposta${this.descricaoTipo}.IdPropriedade = propriedade.Id
                INNER JOIN ${this.descricaoTipo} ON ${this.descricaoTipo}.id = propriedaderesposta${this.descricaoTipo}.IdUser
                WHERE propriedadegrupo.idTipoCadastro IN (${this.idTipoCadastro})
                GROUP BY propriedaderesposta${this.descricaoTipo}.IdUser
            ) AS temp
            WHERE 1=1;
        `;
        return await executeQuery(queryCount);
    }
    async getDynamicColumns(result) {
        if(result === undefined || result.length  == 0)
            return ['Id'];
        let columns = Object.keys(result[0]);
    
        columns = columns.filter((el) => {
            if(el !== 'Id')
                return el;
        });
        return columns;
      }

    async getAllActivity(req, res) {
        const fields = await this.getFields();
        if (fields.length === 0) {
            return res.status(200).json([]);
        }

        const queryFields = this.buildQueryFields(fields);
        const whereClause = this.buildWhereClause(fields);

        const result = await this.getQueryResult(queryFields, whereClause);
        const totalCount = await this.getQueryCount(queryFields);

        return res.status(200).json({
            columns: this.getDynamicColumns(result),
            rows: result,
            totalCount: totalCount[0].totalCount,
        });
    }
}


module.exports = GridService;
