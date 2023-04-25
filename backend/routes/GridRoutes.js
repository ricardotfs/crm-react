const express = require('express');
const router = express.Router();
const {gridGetValidation} = require('../middlewares/useGriValidation');
const validate = require('../middlewares/handleValidation');

const {getAllActivity} = require('../controllers/GridController');

router.post('/ticket',gridGetValidation(), validate, getAllActivity);

module.exports = router;

