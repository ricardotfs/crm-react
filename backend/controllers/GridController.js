
const GridService = require('../serviceDomain/GridService');


const getAllActivity = async(req,res) =>{

    const gridService = new GridService(req);

    return gridService.getAllActivity(req, res);
   
}

module.exports ={
    getAllActivity
}