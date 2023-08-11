const express = require('express');
const router = express();

router.use('/api/User',require('./UserRoutes'))
router.use('/api/grid',require('./GridRoutes'))
router.use('/api/formulario',require('./FormularioRoutes'))

router.get('/',(req,res) =>{
    res.send('API Working')
});

module.exports = router;