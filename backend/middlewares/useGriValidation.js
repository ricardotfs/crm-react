const {body} = require('express-validator');

const gridGetValidation = () =>{

    return [
        body('idTipoCadastro')
        .isInt().withMessage('O idTipoCadastro é obrigatório')
        
    ];
}

module.exports = {
    gridGetValidation
};