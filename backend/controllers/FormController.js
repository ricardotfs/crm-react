const FormServiceDomain = require('../serviceDomain/FormServiceDomain');

const formServiceDomain = new FormServiceDomain();

const getById = async (req, res) => {

   return await formServiceDomain.getById(req, res);
}

const update = async (req, res) => {

    return await formServiceDomain.update(req, res); 
}

module.exports = {
    getById,
    update
}   