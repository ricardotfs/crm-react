const {body} = require('express-validator');

const gridGetValidation = () =>{

    return [
        body('idTipoCadastro')
        .isInt().withMessage('O idTipoCadastro é obrigatório'),
        body('page')
        .isInt().withMessage('O page é obrigatório'),
        body('sizePage')
        .isInt().withMessage('O sizePage é obrigatório')
    ];
}

module.exports = {
    gridGetValidation
};