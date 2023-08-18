const express = require('express');
const router = express.Router();
const {getById} = require('../controllers/FormController');
//const authGuard = require('../middlewares/authGuard');

router.get('/:id', getById);

module.exports = router;