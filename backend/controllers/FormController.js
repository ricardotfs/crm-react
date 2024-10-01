const FormServiceDomain = require('../serviceDomain/FormServiceDomain');

const formServiceDomain = new FormServiceDomain();

const getById = async (req, res) => {

   return FormServiceDomain.formServiceDomain(req, res);
}

const update = async (req, res) => {

    return FormServiceDomain.update(req, res); 
}

module.exports = {
    getById,
    update
}   