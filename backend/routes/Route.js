const express = require('express');
const router = express();

router.use('/api/Users',require('./UserRoutes'))

router.get('/',(req,res) =>{
    res.send('API Working')
});

module.exports = router;