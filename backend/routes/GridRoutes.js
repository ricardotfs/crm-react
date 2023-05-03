const express = require('express');
const router = express.Router();
const {gridGetValidation} = require('../middlewares/useGriValidation');
const validate = require('../middlewares/handleValidation');

const {getAllActivity} = require('../controllers/GridController');
const authGuard = require('../middlewares/authGuard');

router.post('/ticket', authGuard, gridGetValidation(), validate, getAllActivity);

module.exports = router;

