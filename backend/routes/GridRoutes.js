const express = require('express');
const router = express.Router();

const {getAllActivity} = require('../controllers/GridController');

router.post('/ticket', getAllActivity);

module.exports = router;

